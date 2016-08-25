'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const rewire = require('rewire');

const countries = rewire('../index.js');

const Andorra = {
  alpha2: 'AD',
  alpha3: 'AND',
  countryCallingCodes: [ '+376' ],
  currencies: [ 'EUR' ],
  ioc: 'AND',
  languages: [ 'cat' ],
  name: 'Andorra',
  status: 'assigned',
  provinces: null,
  alias: null,
};

const California = {
  short: 'CA',
  name: 'California',
  alias: null,
};

const Nagasaki = {
  name: '長崎県',
  alias: ['Nagasaki'],
};

describe('Unit Testing ->', () => {
  describe('JSON ->', () => {
    it('should return an array', () => {
      expect(countries.JSON).to.be.an('array');
    });
    it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status`, `provinces` and `alias` as object keys', () => {
      countries.JSON.forEach((country) => {
        expect(country).to.have.all.keys([
          'alpha2',
          'alpha3',
          'countryCallingCodes',
          'currencies',
          'ioc',
          'languages',
          'name',
          'status',
          'provinces',
          'alias',
        ]);
      });
    });
  });
  describe('alpha2 ->', () => {
    it('should return an object', () => {
      expect(countries[Andorra.alpha2]).to.be.an('object');
    });
    it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status` `provinces`, `alias`, getProvinceByName`, `findProvinceByName`, `getProvinceByNameAndAlias` and `findProvinceByNameAndAlias` as object keys', () => {
      _.forEach(countries, (country, key) => {
        if (_.isString(key) && key.length === 2) {
          expect(countries[key]).to.have.all.keys([
            'alpha2',
            'alpha3',
            'countryCallingCodes',
            'currencies',
            'ioc',
            'languages',
            'name',
            'status',
            'provinces',
            'alias',
            'getProvinceByName',
            'findProvinceByName',
            'getProvinceByNameAndAlias',
            'findProvinceByNameAndAlias',
          ]);
        }
      });
    });
  });
  describe('Methods ->', () => {
    describe('Country Search #', () => {
      describe('getCountryByName()', () => {
        it('should be a function', () => {
          expect(countries.getCountryByName).to.be.a('function');
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.getCountryByName()).to.eql(undefined);
        });
        it('should return country object when find it', () => {
          expect(countries.getCountryByName('Andorra')).to.eql(Andorra);
        });
        it('should return country object with insensitive case with default value', () => {
          expect(countries.getCountryByName('anDorrA')).to.eql(Andorra);
        });
        it('should return country object with insensitive case', () => {
          expect(countries.getCountryByName('anDorrA', false)).to.eql(Andorra);
        });
        it('should return `undefined` with sensitive case', () => {
          expect(countries.getCountryByName('anDorrA', true)).to.eql(undefined);
        });
        it('should return `undefined` when can\'t find it', () => {
          expect(countries.getCountryByName('YUYUYU')).to.eql(undefined);
        });
      });
      describe('findCountryByName()', () => {
        it('should be a function', () => {
          expect(countries.findCountryByName).to.be.a('function');
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.findCountryByName()).to.eql(undefined);
        });
        it('should return country object when find it', () => {
          expect(countries.findCountryByName('Andorra')).to.eql(Andorra);
        });
        it('should return country object with insensitive case with default value', () => {
          expect(countries.findCountryByName('anDorrA')).to.eql(Andorra);
        });
        it('should return country object with insensitive case', () => {
          expect(countries.findCountryByName('anDorrA', false)).to.eql(Andorra);
        });
        it('should return `undefined` with sensitive case', () => {
          expect(countries.findCountryByName('anDorrA', true)).to.eql(undefined);
        });
        it('should return `undefined` when can\'t find it', () => {
          expect(countries.findCountryByName('YUYUYU')).to.eql(undefined);
        });
      });
    });
    describe('Province Search #', () => {
      describe('getProvinceByName()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].getProvinceByName).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].getProvinceByName()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.US.getProvinceByName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.US.getProvinceByName('California')).to.eql(California);
        });
        it('should return province object with insensitive case with default value', () => {
          expect(countries.US.getProvinceByName('caLifoRnia')).to.eql(California);
        });
        it('should return province object with insensitive case', () => {
          expect(countries.US.getProvinceByName('caLifoRnia', false)).to.eql(California);
        });
        it('should return province object with sensitive case', () => {
          expect(countries.US.getProvinceByName('caLifoRnia', true)).to.eql(undefined);
        });
        it('should return province object when can\'t find it', () => {
          expect(countries.US.getProvinceByName('Unknow')).to.eql(undefined);
        });
      });
      describe('findProvinceByName()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].findProvinceByName).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].findProvinceByName()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.US.findProvinceByName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.US.findProvinceByName('California')).to.eql(California);
        });
        it('should return province object with insensitive case with default value', () => {
          expect(countries.US.findProvinceByName('caLifoRnia')).to.eql(California);
        });
        it('should return province object with insensitive case', () => {
          expect(countries.US.findProvinceByName('caLifoRnia', false)).to.eql(California);
        });
        it('should return province object with sensitive case', () => {
          expect(countries.US.findProvinceByName('caLifoRnia', true)).to.eql(undefined);
        });
        it('should return province object when can\'t find it', () => {
          expect(countries.US.findProvinceByName('Unknow')).to.eql(undefined);
        });
      });
      describe('getProvinceByNameAndAlias()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].getProvinceByNameAndAlias).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].getProvinceByNameAndAlias()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.JP.getProvinceByNameAndAlias()).to.eql(undefined);
        });
        it('should return province object when find it not using english name', () => {
          expect(countries.JP.getProvinceByNameAndAlias('長崎県')).to.eql(Nagasaki);
        });
        it('should return province object when find it using english name', () => {
          expect(countries.JP.getProvinceByNameAndAlias('Nagasaki')).to.eql(Nagasaki);
        });
        it('should return province object with insensitive case with default value using english name', () => {
          expect(countries.JP.getProvinceByNameAndAlias('nAgasAki')).to.eql(Nagasaki);
        });
        it('should return province object with insensitive case using english name', () => {
          expect(countries.JP.getProvinceByNameAndAlias('nAgasAki', false)).to.eql(Nagasaki);
        });
        it('should return province object with sensitive case using english name', () => {
          expect(countries.JP.getProvinceByNameAndAlias('nAgasAki', true)).to.eql(undefined);
        });
        it('should return province object when can\'t find it', () => {
          expect(countries.JP.getProvinceByNameAndAlias('Unknow')).to.eql(undefined);
        });
      });
      describe('findProvinceByNameAndAlias()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].findProvinceByNameAndAlias).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].findProvinceByNameAndAlias()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.JP.findProvinceByNameAndAlias()).to.eql(undefined);
        });
        it('should return province object when find it not using english name', () => {
          expect(countries.JP.findProvinceByNameAndAlias('長崎県')).to.eql(Nagasaki);
        });
        it('should return province object when find it using english name', () => {
          expect(countries.JP.findProvinceByNameAndAlias('Nagasaki')).to.eql(Nagasaki);
        });
        it('should return province object with insensitive case with default value using english name', () => {
          expect(countries.JP.findProvinceByNameAndAlias('nAgasAki')).to.eql(Nagasaki);
        });
        it('should return province object with insensitive case using english name', () => {
          expect(countries.JP.findProvinceByNameAndAlias('nAgasAki', false)).to.eql(Nagasaki);
        });
        it('should return province object with sensitive case using english name', () => {
          expect(countries.JP.findProvinceByNameAndAlias('nAgasAki', true)).to.eql(undefined);
        });
        it('should return province object when can\'t find it', () => {
          expect(countries.JP.findProvinceByNameAndAlias('Unknow')).to.eql(undefined);
        });
      });
    });
  });
});