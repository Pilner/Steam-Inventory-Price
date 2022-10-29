# Steam Inventory Price Checker

Project to show all your items in your inventory with their respective prices.

## STATUS
* Not finished due to: `HTTP 429` (Too many requests) with the [Steam Market API](https://steamcommunity.com/market/)
* Two GET requests to get:
  - [x] Steam Profile Inventory
  - [x] Steam Market Prices
* The problem here is that in the case where a user has 50+ unique items in their inventory in a respective game (CSGO = 730), `HTTP 429` kicks in - rendering the rest of the JSON `null`.


## How to use

*Note: Make sure you have a [Node.js](https://nodejs.org/en/) installed. To check, run `node -v` in your terminal*

1. First clone this git repository to your local device
```
git clone https://github.com/Pilner/steam-inventory-price
```
2. Download all the dependencies and packages needed in this repository
```
npm install
```
3. Run the program
```
npm start
```

## Copyright
This code is copyrighted by Fabian Railey A. Victuelles.
