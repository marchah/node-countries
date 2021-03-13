"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countries = exports.findCountryByNameOrShortName = exports.findCountryByName = exports.getCountryByNameOrShortName = exports.getCountryByName = exports.json = void 0;
const lodash_1 = require("lodash");
const countries_1 = __importDefault(require("./countries"));
exports.json = Object.keys(countries_1.default).map((key) => countries_1.default[key]);
/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
function getCountryByName(name, useAlias) {
    var _a;
    if (!lodash_1.isString(name))
        return null;
    return ((_a = (exports.json || []).find(function (country) {
        if (useAlias) {
            return (country.name.toUpperCase() === name.toUpperCase() ||
                (country.alias || []).find(function (alias) {
                    return alias.toUpperCase() === name.toUpperCase();
                }));
        }
        return country.name.toUpperCase() === name.toUpperCase();
    })) !== null && _a !== void 0 ? _a : null);
}
exports.getCountryByName = getCountryByName;
/**
 * Find the country object of the given country name or short name
 *
 * @param {String}  name              country name or short name (alpha2)
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
function getCountryByNameOrShortName(name, useAlias) {
    var _a;
    if (!lodash_1.isString(name))
        return null;
    return ((_a = (exports.json || []).find(function (country) {
        if (useAlias) {
            return (country.name.toUpperCase() === name.toUpperCase() ||
                country.alpha2.toUpperCase() === name.toUpperCase() ||
                (country.alias || []).find(function (alias) {
                    return alias.toUpperCase() === name.toUpperCase();
                }));
        }
        return (country.name.toUpperCase() === name.toUpperCase() ||
            country.alpha2.toUpperCase() === name.toUpperCase());
    })) !== null && _a !== void 0 ? _a : null);
}
exports.getCountryByNameOrShortName = getCountryByNameOrShortName;
exports.findCountryByName = getCountryByName;
exports.findCountryByNameOrShortName = getCountryByNameOrShortName;
/**
 * Find the province object of the given province name
 *
 * @param {String}  name              english province name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} province          province object
 */
function getProvinceByName(name, useAlias) {
    var _a;
    if (!lodash_1.isString(name) || !Array.isArray(this.provinces))
        return null;
    return ((_a = (this.provinces || []).find(function (province) {
        if (useAlias) {
            return (province.name.toUpperCase() === name.toUpperCase() ||
                (province.alias || []).find(function (alias) {
                    return alias.toUpperCase() === name.toUpperCase();
                }));
        }
        return province.name.toUpperCase() === name.toUpperCase();
    })) !== null && _a !== void 0 ? _a : null);
}
/**
 * Find the province object of the given province name or short name
 *
 * @param {String}  name              english province name or short name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} province          province object
 */
function getProvinceByNameOrShortName(name, useAlias) {
    var _a;
    if (!lodash_1.isString(name) || !Array.isArray(this.provinces))
        return null;
    return ((_a = (this.provinces || []).find(function (province) {
        if (useAlias) {
            return (province.name.toUpperCase() === name.toUpperCase() ||
                (province.short && province.short.toUpperCase() === name.toUpperCase()) ||
                (province.alias || []).find(function (alias) {
                    return alias.toUpperCase() === name.toUpperCase();
                }));
        }
        return (province.name.toUpperCase() === name.toUpperCase() ||
            (province.short && province.short.toUpperCase() === name.toUpperCase()));
    })) !== null && _a !== void 0 ? _a : null);
}
/**
 *
 * Add search function to each country and map each country by alpha2
 */
const listCountries = lodash_1.keyBy(lodash_1.cloneDeep(countries_1.default), 'alpha2');
exports.countries = Object.keys(listCountries).reduce((acc, key) => ({
    ...acc,
    [key]: {
        ...listCountries[key],
        getProvinceByName: getProvinceByName.bind(listCountries[key]),
        findProvinceByName: getProvinceByName.bind(listCountries[key]),
        getProvinceByNameOrShortName: getProvinceByNameOrShortName.bind(listCountries[key]),
        findProvinceByNameOrShortName: getProvinceByNameOrShortName.bind(listCountries[key]),
    },
}), {});
