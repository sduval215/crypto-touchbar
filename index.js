const { app, BrowserWindow, TouchBar, nativeImage } = require('electron');
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;

const axios = require('axios');

let window;

app.once('ready', async () => {
  
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })

  axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
    .then(({ data }) => {
      const responseData = data.data;
      console.log(responseData);
      const touchBarObject = new TouchBarButton({
        label: `${responseData.base} ${responseData.amount} ${responseData.currency}`,
        backgroundColor: '#F18F19',
        icon: nativeImage.createFromPath('./imgs/bitcoin-logo.png').resize({
          width: 13,
          height: 16
        }),
        iconPosition: 'left',
        click: () => {
          return null;
        }
      })
      
      const touchBar = new TouchBar({
        items: [
          touchBarObject
        ]
      });
    
      window.loadURL('about:blank')
      window.setTouchBar(touchBar);
    })
    .catch(error => {
      console.log('error: ', error);
    })
})

