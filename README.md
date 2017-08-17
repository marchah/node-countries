# node-countries
Countries JSON data

## Installation

Install via [npm](https://www.npmjs.com/):

```
$ npm install node-countries
```

## Documentation

This module currently has states and provinces for:

* United States (US)
* United Kingdom (GB)
* Canada (CA)
* Mexico (MX)
* Australia (AU)
* China (CN)
* Germany (DE)
* Belgium (BE)
* Netherlands (NL)
* Denmark (DK)
* Turkey (TR)
* Indonesia (ID)
* Jordan (JO)
* India (IN)
* Cambodia (KH)
* Ethiopia (ET)
* Peru (PE)
* Cuba (CU)
* Argentina (AR)
* Chile (CL)
* Bolivia (BO)
* Spain (ES)
* Bangladesh (BD)
* Pakistan (PK)
* Nigeria (NG)
* Japan (JP)
* Austria (AT)
* Brazil (BR)
* Philippines (PH)
* Vietnam (VN)

### Data

#### `JSON`

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

All the contry are accessible directly through their [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) (two letter code)
```javascript
const countries = require('countries');

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
Also you have the possibility to find province information by name

##### getProvinceByName(name, [useAlias])

Return the matched province object, else undefined (alias: `findProvinceByName`)

##### getProvinceByNameOrShortName(name or short name, [useAlias])

Return the matched province object, else undefined (alias: `findProvinceByNameOrShortName`)


## Methods

### getCountryByName(name, [useAlias])

Return the matched country object, else undefined (alias: `findCountryByName`)

### getCountryByNameOrShortName(name or short name (alpha2), [useAlias])

Return the matched country object, else undefined (alias: `findCountryByNameOrShortName`)

## Examples

````javascript
const countries = require('countries');

console.log(countries.getCountryByName('Andorra'));
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
````

````javascript
const countries = require('countries');

console.log(countries.CA.getProvinceByName('Labrador', false));
/*
  undefined
*/

console.log(countries.CA.getProvinceByName('Labrador', true));
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
````

## Note

Inspired by [country-data](https://github.com/OpenBookPrices/country-data) and [provinces](https://github.com/substack/provinces)

## Contributing

This project is a work in progress and subject to API changes, please feel free to contribute
