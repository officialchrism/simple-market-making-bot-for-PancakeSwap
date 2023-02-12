const axios = require('axios');
const INTERVAL = 1000 * 60; // 1 minute interval
const SYMBOL = 'BTC/USD';
const API_URL = 'https://api.pancakeswap.com/v1';

let spread;
let lastPrice;

async function getPrice() {
  try {
    const response = await axios.get(`${API_URL}/ticker/${SYMBOL}`);
    const price = response.data.last;
    if (!lastPrice) {
      lastPrice = price;
    } else if (price > lastPrice) {
      spread = (price - lastPrice) / 2;
    } else {
      spread = (lastPrice - price) / 2;
    }
    lastPrice = price;
  } catch (error) {
    console.error(error);
  }
}

setInterval(getPrice, INTERVAL);

async function placeOrder(side, price, size) {
  try {
    const response = await axios.post(`${API_URL}/order`, {
      symbol: SYMBOL,
      side,
      price,
      size,
      type: 'limit'
    });
    console.log(`Placed ${side} order:`, response.data);
  } catch (error) {
    console.error(error);
  }
}

async function startMarketMaking() {
  try {
    const bidPrice = lastPrice - spread;
    const askPrice = lastPrice + spread;
    const orderSize = 0.01;

    await placeOrder('buy', bidPrice, orderSize);
    await placeOrder('sell', askPrice, orderSize);
  } catch (error) {
    console.error(error);
  }
}

setInterval(startMarketMaking, INTERVAL);
