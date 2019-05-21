const { app, BrowserWindow, TouchBar } = require('electron');

const { getCurrencyData } = require('./helpers/http');
const { touchBarArray } = require('./helpers/touchbar');

/**
 * Fetches coinbase currency data and updates object argument label
 */
updateCurrencyData = async (touchBarObject) => {
  // create request variable with coinbase BTC value requests
  const request = await getCurrencyData('https://api.coinbase.com/v2/prices/spot?currency=USD');
  // deconstruct necessary variables
  const { base, currency, amount } = request.data;
  // update toucbar label
  touchBarObject.label = `${base} ${amount} ${currency}`;
}

let windowOptions = {
  width: 400,
  height: 400,
  backgroundColor: '#FFF',
  fullscreen: false,
  resizable: false,
  title: 'Crypto Touchbar',
};


app.once('ready', async () => {
  // set window variable to new BrowserWindow class
  const window = new BrowserWindow(windowOptions);
  // set touchbar variable to new TouchBar class
  const touchBar = new TouchBar({ items: touchBarArray });
  // load index.html
  window.loadFile(__dirname + '/gui/index.html');
  // call window object methods with necessary information/variables
  window.setTouchBar(touchBar);
  // set initial currency data
  updateCurrencyData(touchBarObject);
  // once initially set, call interval every 3 minutes (180000 milliseconds)
  setInterval(() => updateCurrencyData(touchBarObject), 180000);
});
