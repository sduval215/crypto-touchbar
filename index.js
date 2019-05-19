const { app, BrowserWindow, TouchBar, nativeImage } = require('electron');
const { TouchBarButton } = TouchBar;

const { getCurrencyData } = require('./helpers/http');

app.once('ready', async () => {

  let window;
  // set window variable to new BrowserWindow class
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 5,
    height: 5,
    backgroundColor: '#000'
  })
  // create request variable with coinbase BTC value requests
  const request = await getCurrencyData('https://api.coinbase.com/v2/prices/spot?currency=USD');
  // deconstruct necessary variables
  const { base, currency, amount } = request.data;
  // set touchBarObject to new TouchBarButton class
  const touchBarObject = new TouchBarButton({
    label: `${base} ${amount} ${currency}`,
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
  // call window object methods with necessary information/variables
  window.loadURL('about:blank')
  window.setTouchBar(touchBar);
  // once initially set, call interval every 3 minutes (180000 milliseconds)
  setInterval(async () => {
    // create new request variable with updated currency data
    const request = await getCurrencyData('https://api.coinbase.com/v2/prices/spot?currency=USD');
    // deconstruct necessary variables
    const { base, currency, amount } = request.data;
    // update toucbar label
    touchBarObject.label = `${base} ${amount} ${currency}`
  }, 180000);
});
