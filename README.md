# simple-market-making-bot-for-PancakeSwap
This bot calculates the spread between the current price and the last price, and places a bid order at the midpoint minus the spread and an ask order at the midpoint.
midpoint plus the spread. You can adjust the interval and order size to your liking, and make sure to replace SYMBOL and API_URL with the correct values for the crypto you want to trade.
Note: This is just an example to demonstrate the basic idea of how a market making bot could work. There are many other factors to consider and additional functionality that you would likely want to add before using a bot like this in a real-world trading scenario. Additionally, this code does not take into account fees, order book depth, or any other real-world considerations that are important for a market making bot to operate effectively.
This bot is written in Node.js and uses the axios library for making API calls to PancakeSwap's API.
