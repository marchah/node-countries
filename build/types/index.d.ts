import { Country, CountryRaw, Maybe } from './types';
export declare const json: CountryRaw[];
/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
export declare function getCountryByName(name?: Maybe<string>, useAlias?: Maybe<boolean>): Maybe<CountryRaw>;
/**
 * Find the country object of the given country name or short name
 *
 * @param {String}  name              country name or short name (alpha2)
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
export declare function getCountryByNameOrShortName(name?: Maybe<string>, useAlias?: Maybe<boolean>): Maybe<CountryRaw>;
export declare const findCountryByName: typeof getCountryByName;
export declare const findCountryByNameOrShortName: typeof getCountryByNameOrShortName;
export declare const countries: {
    [countryCode: string]: Country;
};
