const { app, BrowserWindow, TouchBar, nativeImage } = require('electron');
const { TouchBarButton } = TouchBar;

const { getCurrencyData } = require('./helpers/http');

let window;

app.once('ready', async () => {
  
  // TODO: Make this prettier
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })

  const request = await getCurrencyData('https://api.coinbase.com/v2/prices/spot?currency=USD');

  const { base, currency, amount } = request.data;

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
  
  const touchBar = new TouchBar({
    items: [
      touchBarObject
    ]
  });

  window.loadURL('about:blank')
  window.setTouchBar(touchBar);
});
