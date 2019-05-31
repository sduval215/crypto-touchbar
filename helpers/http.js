const axios = require('axios');
const { getSymbolFromColor, touchBarArray } = require('./touchbar');

/**
 * Returns coinbase http request based on url argument
 * @param {string} url - url to base network request off
 * @returns { Object } - returns success/error object depending on request outcome
 */
const getCurrencyData = async (url) => {
  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    })
}

/**
 * Fetches coinbase currency data and updates object argument label
 */
const updateCurrencyData = async () => {
  touchBarArray.forEach(async ({_label, _backgroundColor}, index) => {
    if(_label) {
      let currencySymbol = getSymbolFromColor(_backgroundColor); // get currency symbol
      const { data } = await getCurrencyData(`https://api.coinbase.com/v2/prices/${currencySymbol}-USD/spot`); // make request using currency symbol
      touchBarArray[index].label = "$" + data.amount; // update touchbar array object label with fetched amount
    }
  })
}

module.exports = {
  getCurrencyData,
  updateCurrencyData
}