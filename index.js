const { app, BrowserWindow, TouchBar, nativeImage } = require('electron');
const { TouchBarButton } = TouchBar;

const { getCurrencyData } = require('./helpers/http');

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

app.once('ready', async () => {

  let window;
  // set window variable to new BrowserWindow class
  window = new BrowserWindow({
    width: 400,
    height: 400,
    backgroundColor: '#FFF',
    fullscreen: false,
    resizable: false,
    title: 'Crypto Touchbar',
  });

  // set touchBarObject to new TouchBarButton class
  const touchBarObject = new TouchBarButton({
    label: `Loading...`,
    backgroundColor: '#F18F19',
    icon: nativeImage.createFromPath('./imgs/bitcoin-logo.png').resize({
      width: 13,
      height: 16
    }),
    iconPosition: 'left',
    click: () => null
  })
  // set touchbar variable to new TouchBar class
  const touchBar = new TouchBar({
    items: [ touchBarObject ]
  });
  // load index.html
  window.loadFile(__dirname + '/gui/index.html');
  // call window object methods with necessary information/variables
  window.setTouchBar(touchBar);
  // set initial currency data
  updateCurrencyData(touchBarObject);

  console.log(__dirname);

  // once initially set, call interval every 3 minutes (180000 milliseconds)
  setInterval(() => updateCurrencyData(touchBarObject), 180000);
});
