const { TouchBar, nativeImage } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;

const axios = require('axios');

/**
 * Handles icon setting through electron nativeImage object
 * @param {string} label - image label to refer to
 * @param {number} height - height of icon (px)
 * @param {number} width - width of icon (px)
 */
const getIcon = (label = 'bitcoin', height = 16, width = 14) => {
   return nativeImage.createFromPath(__dirname + `/imgs/${label}-logo.png`).resize({height, width});
};

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

/**
 * Manually updates the currency price based on TouchBar Object passed in
 * @param {Touchbar Object} object - TouchBar object to evaluate necessary _backgroundColor
 */
const manuallyUpdateCurrency = async (object) => {
  let { _backgroundColor } = object;
  let currencySymbol = getSymbolFromColor(_backgroundColor);
  const { data } = await axios(`https://api.coinbase.com/v2/prices/${currencySymbol}-USD/spot`);
  object.label = "$" + parseFloat(data.data.amount).toFixed(2); // update touchbar array object label with fetched amount
}

const spacer = new TouchBarSpacer({ size: 'small '});

let touchBarArray = [
  new TouchBarButton({
    label: 'Loading...',
    backgroundColor: '#F18F19',
    icon: getIcon('bitcoin', 16, 13),
    click: () => manuallyUpdateCurrency(touchBarArray[0]),
    iconPosition: 'left',
  }),
  spacer, // spacer element
  new TouchBarButton({
    label: 'Loading...',
    backgroundColor: '#4C60B3',
    icon: getIcon('ethereum', 18, 12),
    click: () => manuallyUpdateCurrency(touchBarArray[2]),
    iconPosition: 'left',
  }),
  spacer, // spacer element
  new TouchBarButton({
    label: 'Loading..',
    backgroundColor: '#87898A',
    icon: getIcon('litecoin', 14, 12),
    click: () => manuallyUpdateCurrency(touchBarArray[4]),
    iconPosition: 'left',
  }),
]

module.exports = {
  touchBarArray,
  getSymbolFromColor
}
