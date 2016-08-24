'use strict';

const _ = require('lodash');

const countries = require('./data/countries.json');

const toExport = {
  JSON: countries,
};


/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [isCaseSensitive] case sensitive flag, default `false`
 * @return {Object} country           country object
 */
function getCountryByName(name, isCaseSensitive) {
  if (!_.isString(name)) return undefined;

  return _.find(countries, (country) => {
    if (isCaseSensitive) {
      return country.name === name;
    }
    return country.name.toUpperCase() === name.toUpperCase();
  });
}

toExport.getCountryByName = getCountryByName;
toExport.findCountryByName = getCountryByName;



/**
 * Find the province object of the given province name
 *
 * @param {String}  name              province name
 * @param {Boolean} [isCaseSensitive] case sensitive flag, default `false`
 * @return {Object} province           province object
 */
function getProvinceByName(name, isCaseSensitive) {
  if (!_.isString(name) || !_.isArray(this.provinces)) return undefined;

  return _.find(this.provinces, (province) => {
    if (isCaseSensitive) {
      return province.name === name;
    }
    return province.name.toUpperCase() === name.toUpperCase();
  });
}

/**
 * Find the province object of the given province english name 
 *
 * @param {String}  name              english province name
 * @param {Boolean} [isCaseSensitive] case sensitive flag, default `false`
 * @return {Object} province           province object
 */
function getProvinceByEnglishName(name, isCaseSensitive) {
  if (!_.isString(name) || !_.isArray(this.provinces)) return undefined;

  return _.find(this.provinces, (province) => {
    if (isCaseSensitive) {
      return province.name === name || province.english === name;
    }
    return province.name.toUpperCase() === name.toUpperCase()
      || (province.english && province.english.toUpperCase() === name.toUpperCase());
  });
}

/**
 * 
 * Add search function to each country and map each country by alpha2
 */
const listCountries = _.keyBy(_.cloneDeep(countries), 'alpha2');
_.forEach(listCountries, (country, key) => {
  country.getProvinceByName = _.bind(getProvinceByName, country);
  country.findProvinceByName = _.bind(getProvinceByName, country);
  country.getProvinceByEnglishName = _.bind(getProvinceByEnglishName, country);
  country.findProvinceByEnglishName = _.bind(getProvinceByEnglishName, country);
  toExport[key] = country;
});

module.exports = toExport;
