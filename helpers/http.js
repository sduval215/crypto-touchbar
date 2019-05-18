const axios = require('axios');

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

module.exports = {
  getCurrencyData
}