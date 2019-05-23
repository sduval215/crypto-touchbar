const { TouchBar, nativeImage } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;

/**
 * Handles icon setting through electron nativeImage object
 * @param {string} label - image label to refer to
 * @param {number} height - height of icon (px)
 * @param {number} width - width of icon (px)
 */
const getIcon = (label = 'bitcoin', height = 16, width = 14) => {
   return nativeImage.createFromPath(`./imgs/${label}-logo.png`).resize({height, width});
};

const spacer = new TouchBarSpacer({ size: 'small '});

const baseTouchBar = {
  iconPosition: 'left',
  click: () => null
}

let touchBarArray = [
  new TouchBarButton({
    label: 'Loading...',
    backgroundColor: '#F18F19',
    icon: getIcon('bitcoin', 16, 13),
    ...baseTouchBar
  }),
  spacer, // spacer element
  new TouchBarButton({
    label: 'Loading...',
    backgroundColor: '#4C60B3',
    icon: getIcon('ethereum', 18, 12),
    ...baseTouchBar
  }),
  spacer, // spacer element
  new TouchBarButton({
    label: 'Loading..',
    backgroundColor: '#87898A',
    icon: getIcon('litecoin', 14, 12),
    ...baseTouchBar
  }),
]

/**
 * Returns currency symbol based on background color hex string argument
 * @param {string} backgroundColor - background color as a hex string
 * @returns {string} - returns currency symbol string
 */
const getSymbolFromColor = (backgroundColor) => {
  let currencySymbol;
  switch(backgroundColor) {
    case('#F18F19'): // Bitcoin
      currencySymbol = 'BTC';
      break;
    case('#4C60B3'): // Ethereum
      currencySymbol = 'ETH';
      break;
    case('#87898A'): // Litecoin
      currencySymbol = 'LTC';
      break;
    default:
      break;
  }
  return currencySymbol; //return evaluated currency symbol
}


module.exports = {
  touchBarArray,
  getSymbolFromColor
}
