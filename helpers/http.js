const { getSymbolFromColor, touchBarArray } = require('./touchbar');
const axios = require('axios');

/**
 * Fetches coinbase currency data and updates object argument label
 */
const updateCurrencyData = async () => {
  touchBarArray.forEach(async ({_label, _backgroundColor}, index) => {
    if(_label) {
      let currencySymbol = getSymbolFromColor(_backgroundColor); // get currency symbol
      const { data } = await axios(`https://api.coinbase.com/v2/prices/${currencySymbol}-USD/spot`); // make request using currency symbol
      touchBarArray[index].label = "$" + data.data.amount; // update touchbar array object label with fetched amount
    }
  })
};

module.exports = {
  updateCurrencyData
}