# node-countries
Countries JSON data

## Installation

Install via [npm](https://www.npmjs.com/):

```
$ npm install node-countries
```

## Documentation

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
    "provinces": null
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
    "provinces": null
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
    "provinces": null
  }
*/
```
Also you have the possibility to find province information by name

##### getProvinceByName(name, [isCaseSensitive])

Return the matched province object, else undefined (alias: `findProvinceByName`)

##### getProvinceByEnglishName(englishName, [isCaseSensitive])

Return the matched province object, else undefined (alias: `findProvinceByEnglishName`)


## Methods

### getCountryByName(name, [isCaseSensitive])

Return the matched country object, else undefined (alias: `findCountryByName`)

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
    "provinces": null
  }
*/
````

## Note

Inspired by [country-data](https://github.com/OpenBookPrices/country-data) and [provinces](https://github.com/substack/provinces)

## Contributing

This project is a work in progress and subject to API changes, please feel free to contribute