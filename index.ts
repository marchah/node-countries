import { cloneDeep, keyBy, isString } from 'lodash';

import countriesRaw from './countries';
import { Country, CountryRaw, Maybe, Province } from './types';

export const json: CountryRaw[] = Object.keys(countriesRaw).map((key) => countriesRaw[key]);

/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
export function getCountryByName(
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<CountryRaw> {
  if (!isString(name)) return null;

  return (
    (json || []).find(function (country: CountryRaw) {
      if (useAlias) {
        return (
          country.name.toUpperCase() === name.toUpperCase() ||
          (country.alias || []).find(function (alias) {
            return alias.toUpperCase() === name.toUpperCase();
          })
        );
      }
      return country.name.toUpperCase() === name.toUpperCase();
    }) ?? null
  );
}

/**
 * Find the country object of the given country name or short name
 *
 * @param {String}  name              country name or short name (alpha2)
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
export function getCountryByNameOrShortName(
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<CountryRaw> {
  if (!isString(name)) return null;

  return (
    (json || []).find(function (country: CountryRaw) {
      if (useAlias) {
        return (
          country.name.toUpperCase() === name.toUpperCase() ||
          country.alpha2.toUpperCase() === name.toUpperCase() ||
          (country.alias || []).find(function (alias) {
            return alias.toUpperCase() === name.toUpperCase();
          })
        );
      }
      return (
        country.name.toUpperCase() === name.toUpperCase() ||
        country.alpha2.toUpperCase() === name.toUpperCase()
      );
    }) ?? null
  );
}

export const findCountryByName = getCountryByName;
export const findCountryByNameOrShortName = getCountryByNameOrShortName;

/**
 * Find the province object of the given province name
 *
 * @param {String}  name              english province name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} province          province object
 */
function getProvinceByName(
  this: CountryRaw,
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<Province> {
  if (!isString(name) || !Array.isArray(this.provinces)) return null;

  return (
    (this.provinces || []).find(function (province: Province) {
      if (useAlias) {
        return (
          province.name.toUpperCase() === name.toUpperCase() ||
          (province.alias || []).find(function (alias) {
            return alias.toUpperCase() === name.toUpperCase();
          })
        );
      }
      return province.name.toUpperCase() === name.toUpperCase();
    }) ?? null
  );
}

/**
 * Find the province object of the given province name or short name
 *
 * @param {String}  name              english province name or short name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} province          province object
 */
function getProvinceByNameOrShortName(
  this: CountryRaw,
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<Province> {
  if (!isString(name) || !Array.isArray(this.provinces)) return null;

  return (
    (this.provinces || []).find(function (province: Province) {
      if (useAlias) {
        return (
          province.name.toUpperCase() === name.toUpperCase() ||
          (province.short && province.short.toUpperCase() === name.toUpperCase()) ||
          (province.alias || []).find(function (alias) {
            return alias.toUpperCase() === name.toUpperCase();
          })
        );
      }
      return (
        province.name.toUpperCase() === name.toUpperCase() ||
        (province.short && province.short.toUpperCase() === name.toUpperCase())
      );
    }) ?? null
  );
}

/**
 *
 * Add search function to each country and map each country by alpha2
 */
const listCountries = keyBy(cloneDeep(countriesRaw), 'alpha2');
export const countries: { [countryCode: string]: Country } = Object.keys(listCountries).reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      ...listCountries[key],
      getProvinceByName: getProvinceByName.bind(listCountries[key]),
      findProvinceByName: getProvinceByName.bind(listCountries[key]),
      getProvinceByNameOrShortName: getProvinceByNameOrShortName.bind(listCountries[key]),
      findProvinceByNameOrShortName: getProvinceByNameOrShortName.bind(listCountries[key]),
    },
  }),
  {},
);
