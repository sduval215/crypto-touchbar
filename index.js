const { app, BrowserWindow, TouchBar } = require('electron');

const { getCurrencyData } = require('./helpers/http');
const { touchBarArray, getSymbolFromColor } = require('./helpers/touchbar');

/**
 * Fetches coinbase currency data and updates object argument label
 */
updateCurrencyData = async () => {
  touchBarArray.forEach(async ({_label, _backgroundColor}, index) => {
    if(_label) {
      let currencySymbol = getSymbolFromColor(_backgroundColor);
      const { data } = await getCurrencyData(`https://api.coinbase.com/v2/prices/${currencySymbol}-USD/spot`);
      touchBarArray[index].label = "$" + data.amount;
    }
  })
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
  updateCurrencyData();
  // once initially set, call interval every 3 minutes (180000 milliseconds)
  setInterval(() => updateCurrencyData(), 180000);
});
