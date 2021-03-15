import { isString, keyBy } from 'lodash';

import countriesRaw from './countries';
import { Country, Maybe, Province } from './types';

export const json: Country[] = Object.keys(countriesRaw).map((key) => countriesRaw[key]);

/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
export function getCountryByName(name?: Maybe<string>, useAlias?: Maybe<boolean>): Maybe<Country> {
  if (!isString(name)) return null;

  return (
    (json || []).find(function (country: Country) {
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
): Maybe<Country> {
  if (!isString(name)) return null;

  return (
    (json || []).find(function (country: Country) {
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
export function getProvinceByName(
  country: Country,
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<Province> {
  if (!isString(name) || !Array.isArray(country.provinces)) return null;

  return (
    (country.provinces || []).find(function (province: Province) {
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
export function getProvinceByNameOrShortName(
  country: Country,
  name?: Maybe<string>,
  useAlias?: Maybe<boolean>,
): Maybe<Province> {
  if (!isString(name) || !Array.isArray(country.provinces)) return null;

  return (
    (country.provinces || []).find(function (province: Province) {
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

export const findProvinceByName = getProvinceByName;
export const findProvinceByNameOrShortName = getProvinceByNameOrShortName;

export default keyBy(countriesRaw, 'alpha2');
