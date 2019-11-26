const { app, BrowserWindow, TouchBar } = require('electron');

const { touchBarArray } = require('./helpers/touchbar');
const { updateCurrencyData } = require('./helpers/http');

// set window options
let windowOptions = {
  width: 400,
  height: 400,
  backgroundColor: '#FFF',
  fullscreen: false,
  resizable: false,
  title: 'Crypto Touchbar',
  icon: __dirname + '/imgs/app-logo-icns'
};

// set app icon
app.dock.setIcon(__dirname + '/imgs/app-logo.icns');

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
