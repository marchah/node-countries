# node-countries

Countries JSON data

## Installation

Install via [npm](https://www.npmjs.com/):

```
$ npm install node-countries
```

## Documentation

This module currently has states and provinces for:

- United States (US)
- United Kingdom (GB)
- Canada (CA)
- Mexico (MX)
- Australia (AU)
- China (CN)
- Germany (DE)
- Belgium (BE)
- Netherlands (NL)
- Denmark (DK)
- Turkey (TR)
- Indonesia (ID)
- Jordan (JO)
- India (IN)
- Cambodia (KH)
- Ethiopia (ET)
- Peru (PE)
- Cuba (CU)
- Argentina (AR)
- Chile (CL)
- Bolivia (BO)
- Spain (ES)
- Bangladesh (BD)
- Pakistan (PK)
- Nigeria (NG)
- Japan (JP)
- Austria (AT)
- Brazil (BR)
- Philippines (PH)
- Vietnam (VN)

### Data

#### `getCountries()`

```javascript
import { getCountries } from 'node-countries'
```

Return a JSON array with all the countries

```javascript
[
  {
    "alpha2": "AC",
    "alpha3": "",
    "countryCallingCodes": [
      "+247"
    ],
    "currencies": [
      "USD"
    ],
    "ioc": "SHP",
    "languages": [
      "eng"
    ],
    "name": "Ascension Island",
    "status": "reserved",
    "provinces": null,
    "alias": null
  },
  {
    "alpha2": "AD",
    "alpha3": "AND",
    "countryCallingCodes": [
      "+376"
    ],
    "currencies": [
      "EUR"
    ],
    "ioc": "AND",
    "languages": [
      "cat"
    ],
    "name": "Andorra",
    "status": "assigned",
    "provinces": null,
    "alias": null
  },
  ...
]
```

#### Short cut

All the countries are accessible directly through their [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) (two letter code)

```javascript
import countries from 'node-countries';

console.log(countries.AC);
/*
  {
    "alpha2": "AC",
    "alpha3": "",
    "countryCallingCodes": [
      "+247"
    ],
    "currencies": [
      "USD"
    ],
    "ioc": "SHP",
    "languages": [
      "eng"
    ],
    "name": "Ascension Island",
    "status": "reserved",
    "provinces": null,
    "alias": null
  }
*/
```

## Methods

### getCountryByName(name, [useAlias])

```javascript
import { getCountryByName } from 'node-countries'
```

Return the matched country object, else null (alias: `findCountryByName`)

### getCountryByNameOrShortName(name or short name (alpha2), [useAlias])

```javascript
import { getCountryByNameOrShortName } from 'node-countries'
```

Return the matched country object, else null (alias: `findCountryByNameOrShortName`)

##### getProvinceByName(country, provinceName, [useAlias])

Return the matched province object, else null (alias: `findProvinceByName`)

##### getProvinceByNameOrShortName(country, provinceName or short name, [useAlias])

Return the matched province object, else null (alias: `findProvinceByNameOrShortName`)

## Examples

```javascript
import { getCountryByName } from 'node-countries'

console.log(getCountryByName("Andorra"));
/*
  {
    "alpha2": "AD",
    "alpha3": "AND",
    "countryCallingCodes": [
      "+376"
    ],
    "currencies": [
      "EUR"
    ],
    "ioc": "AND",
    "languages": [
      "cat"
    ],
    "name": "Andorra",
    "status": "assigned",
    "provinces": null,
    "alias": null
  }
*/
```

```javascript
import countries from "node-countries";

console.log(getProvinceByName(countries.CA, "Labrador", false));
/*
  null
*/

console.log(getProvinceByName(countries.CA, "Labrador", true));
/*
  {
    "short": "NL",
    "name": "Newfoundland and Labrador",
    "alias": [
      "Newfoundland",
      "Labrador"
    ]
  }
*/
```

## Note

Inspired by [country-data](https://github.com/OpenBookPrices/country-data) and [provinces](https://github.com/substack/provinces)

## Contributing

This project is a work in progress and subject to API changes, please feel free to contribute
