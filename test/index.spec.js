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

const NewfoundlandAndLabrador = {
  short: 'NL',
  name: 'Newfoundland and Labrador',
  alias: ['Newfoundland', 'Labrador'],
};

const California = {
  short: 'CA',
  name: 'California',
  'alias': null,
}

const GuineaBissau = {
  alpha2: 'GW',
  alpha3: 'GNB',
  countryCallingCodes: ['+245'],
  currencies: ['XOF'],
  ioc: 'GBS',
  languages: ['por'],
  name: 'Guinea-Bissau',
  status: 'assigned',
  provinces: null,
  alias: ['Guinea Bissau'],
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
    it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status` `provinces`, `alias`, getProvinceByName` and `findProvinceByName` as object keys', () => {
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
            'getProvinceByNameOrShortName',
            'findProvinceByNameOrShortName',
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
          expect(countries.getCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
        });
        it('should return country object by ignoring case', () => {
          expect(countries.getCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.getCountryByName('Guinea Bissau')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.getCountryByName('Guinea Bissau', false)).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `true`', () => {
          expect(countries.getCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.getCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });
        it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
          expect(countries.getCountryByName('Andorra', true)).to.eql(Andorra);
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
          expect(countries.findCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
        });
        it('should return country object when find it by ignoring case', () => {
          expect(countries.findCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.findCountryByName('Guinea Bissau')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.findCountryByName('Guinea Bissau', false)).to.eql(undefined);
        });
        it('should return country object when searching alias with useAlias parameter `true`', () => {
          expect(countries.findCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });
        it('should return country object by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.findCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });
        it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
          expect(countries.findCountryByName('Andorra', true)).to.eql(Andorra);
        });
      });
      describe('getCountryByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(countries.getCountryByNameOrShortName).to.be.a('function');
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.getCountryByNameOrShortName()).to.eql(undefined);
        });
        it('should return country object when find it', () => {
          expect(countries.getCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
        });
        it('should return country object when find it using short name', () => {
          expect(countries.getCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
        });
        it('should return country object by ignoring case', () => {
          expect(countries.getCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });
        it('should return country object by ignoring case using short name', () => {
          expect(countries.getCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.getCountryByNameOrShortName('Guinea Bissau')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.getCountryByNameOrShortName('Guinea Bissau', false)).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `true`', () => {
          expect(countries.getCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.getCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.getCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.getCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
        });
        it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
          expect(countries.getCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
        });
      });
      describe('findCountryByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(countries.findCountryByNameOrShortName).to.be.a('function');
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.findCountryByNameOrShortName()).to.eql(undefined);
        });
        it('should return country object when find it', () => {
          expect(countries.findCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
        });
        it('should return country object when find it using short name', () => {
          expect(countries.findCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
        });
        it('should return country object when find it by ignoring case', () => {
          expect(countries.findCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });
        it('should return country object when find it by ignoring case using short name', () => {
          expect(countries.findCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.findCountryByNameOrShortName('Guinea Bissau')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.findCountryByNameOrShortName('Guinea Bissau', false)).to.eql(undefined);
        });
        it('should return country object when searching alias with useAlias parameter `true`', () => {
          expect(countries.findCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.findCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.findCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });
        it('should return `undefined` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.findCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
        });
        it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
          expect(countries.findCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
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
          expect(countries.CA.getProvinceByName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.CA.getProvinceByName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case', () => {
          expect(countries.CA.getProvinceByName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.CA.getProvinceByName('NewfoUndland')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.CA.getProvinceByName('NewfoUndland', false)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.getProvinceByName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.getProvinceByName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(countries.US.getProvinceByName('caLifoRnia', true)).to.eql(California);
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
          expect(countries.CA.findProvinceByName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.CA.findProvinceByName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case', () => {
          expect(countries.CA.findProvinceByName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.CA.findProvinceByName('NewfoUndland')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.CA.findProvinceByName('NewfoUndland', false)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.findProvinceByName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.findProvinceByName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(countries.US.findProvinceByName('caLifoRnia', true)).to.eql(California);
        });
      });
      describe('getProvinceByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].getProvinceByNameOrShortName).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].getProvinceByNameOrShortName()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.CA.getProvinceByNameOrShortName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.CA.getProvinceByNameOrShortName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it using short name', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NL')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case using short name', () => {
          expect(countries.CA.getProvinceByNameOrShortName('Nl')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when country has no short name province', () => {
          expect(countries.BO.getProvinceByNameOrShortName('VA')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NewfoUndland')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NewfoUndland', false)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.CA.getProvinceByNameOrShortName('NL', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.getProvinceByNameOrShortName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(countries.CA.getProvinceByNameOrShortName('Nl', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when country has no short name province with useAlias parameter `true`', () => {
          expect(countries.BO.getProvinceByNameOrShortName('VA', true)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(countries.US.getProvinceByNameOrShortName('caLifoRnia', true)).to.eql(California);
        });
      });
      describe('findProvinceByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(countries[Andorra.alpha2].findProvinceByNameOrShortName).to.be.a('function');
        });
        it('should return `undefined` when no provinces', () => {
          expect(countries[Andorra.alpha2].findProvinceByNameOrShortName()).to.eql(undefined);
        });
        it('should return `undefined` when no argument', () => {
          expect(countries.CA.findProvinceByNameOrShortName()).to.eql(undefined);
        });
        it('should return province object when find it', () => {
          expect(countries.CA.findProvinceByNameOrShortName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it using short name', () => {
          expect(countries.CA.findProvinceByNameOrShortName('NL')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case', () => {
          expect(countries.CA.findProvinceByNameOrShortName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province object when find it by ignoring case using short name', () => {
          expect(countries.CA.findProvinceByNameOrShortName('Nl')).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when country has no short name province', () => {
          expect(countries.BO.findProvinceByNameOrShortName('VA')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with no useAlias parameter', () => {
          expect(countries.CA.findProvinceByNameOrShortName('NewfoUndland')).to.eql(undefined);
        });
        it('should return `undefined` when searching alias with useAlias parameter `false`', () => {
          expect(countries.CA.findProvinceByNameOrShortName('NewfoUndland', false)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.findProvinceByNameOrShortName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(countries.CA.findProvinceByNameOrShortName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
        });
        it('should return `undefined` when country has no short name province with useAlias parameter `true`', () => {
          expect(countries.BO.findProvinceByNameOrShortName('VA', true)).to.eql(undefined);
        });
        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(countries.US.findProvinceByNameOrShortName('caLifoRnia', true)).to.eql(California);
        });
      });
    });
  });
});