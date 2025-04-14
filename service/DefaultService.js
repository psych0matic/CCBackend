const axios = require('axios');

'use strict';

/**
 * Retrieve all countries
 *
 * returns List
 **/
exports.countriesGET = function() {
  return new Promise(async function(resolve, reject) {
    try {
          const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
          const countries = response.data.map(country => ({
            name: country.name.common || country.name.official ,
            flag: country.flags.png || country.flags.svg || country.flags.alt
          }));
          resolve(countries);
        } catch (error) {
          reject({
            message: 'Failed to fetch countries data',
            error: error.message
          });
        }
  });
}


/**
 * Retrieve details about a specific Country
 *
 * name String 
 * returns CountryDetails
 **/
exports.countriesNameGET = function(name) {
  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
      const country = response.data[0]; // take the first match

      const details = {
        name: country.name?.common || 'N/A',
        flag: country.flags?.png || country.flags?.svg || country.flags?.alt,
        capital: country.capital?.[0] || 'N/A',
        population: country.population || 0
      };

      resolve(details);
    } catch (error) {
      reject({
        message: `Failed to fetch data for country "${name}"`,
        error: error.response?.data?.message || error.message
      });
    }
  });
}

