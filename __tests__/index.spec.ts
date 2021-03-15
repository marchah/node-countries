import _ from 'lodash';
import { expect } from 'chai';

import countries, {
  json,
  getCountryByName,
  findCountryByName,
  getCountryByNameOrShortName,
  findCountryByNameOrShortName,
  getProvinceByName,
  findProvinceByName,
  getProvinceByNameOrShortName,
  findProvinceByNameOrShortName,
} from '../index';

const Andorra = {
  alpha2: 'AD',
  alpha3: 'AND',
  countryCallingCodes: ['+376'],
  currencies: ['EUR'],
  ioc: 'AND',
  languages: ['cat'],
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
  alias: null,
};

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
      expect(json).to.be.an('array');
    });

    it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status`, `provinces` and `alias` as object keys', () => {
      json.forEach((country) => {
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

    it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status` `provinces`, `alias` as object keys', () => {
      Object.keys(countries).forEach((key) => {
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
          ]);
        }
      });
    });
  });

  describe('Methods ->', () => {
    describe('Country Search #', () => {
      describe('getCountryByName()', () => {
        it('should be a function', () => {
          expect(getCountryByName).to.be.a('function');
        });

        it('should return `null` when no argument', () => {
          expect(getCountryByName()).to.eql(null);
        });

        it('should return country object when find it', () => {
          expect(getCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
        });

        it('should return country object by ignoring case', () => {
          expect(getCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(getCountryByName('Guinea Bissau')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(getCountryByName('Guinea Bissau', false)).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `true`', () => {
          expect(getCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });

        it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(getCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });

        it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
          expect(getCountryByName('Andorra', true)).to.eql(Andorra);
        });
      });

      describe('findCountryByName()', () => {
        it('should be a function', () => {
          expect(findCountryByName).to.be.a('function');
        });

        it('should return `null` when no argument', () => {
          expect(findCountryByName()).to.eql(null);
        });

        it('should return country object when find it', () => {
          expect(findCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
        });

        it('should return country object when find it by ignoring case', () => {
          expect(findCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(findCountryByName('Guinea Bissau')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(findCountryByName('Guinea Bissau', false)).to.eql(null);
        });

        it('should return country object when searching alias with useAlias parameter `true`', () => {
          expect(findCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });

        it('should return country object by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(findCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });

        it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
          expect(findCountryByName('Andorra', true)).to.eql(Andorra);
        });
      });

      describe('getCountryByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(getCountryByNameOrShortName).to.be.a('function');
        });

        it('should return `null` when no argument', () => {
          expect(getCountryByNameOrShortName()).to.eql(null);
        });

        it('should return country object when find it', () => {
          expect(getCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
        });

        it('should return country object when find it using short name', () => {
          expect(getCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
        });

        it('should return country object by ignoring case', () => {
          expect(getCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });

        it('should return country object by ignoring case using short name', () => {
          expect(getCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(getCountryByNameOrShortName('Guinea Bissau')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(getCountryByNameOrShortName('Guinea Bissau', false)).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `true`', () => {
          expect(getCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with useAlias parameter `true` using short name', () => {
          expect(getCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
        });

        it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(getCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });

        it('should return `null` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(getCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
        });

        it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
          expect(getCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
        });
      });

      describe('findCountryByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(findCountryByNameOrShortName).to.be.a('function');
        });

        it('should return `null` when no argument', () => {
          expect(findCountryByNameOrShortName()).to.eql(null);
        });

        it('should return country object when find it', () => {
          expect(findCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
        });

        it('should return country object when find it using short name', () => {
          expect(findCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
        });

        it('should return country object when find it by ignoring case', () => {
          expect(findCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
        });

        it('should return country object when find it by ignoring case using short name', () => {
          expect(findCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(findCountryByNameOrShortName('Guinea Bissau')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(findCountryByNameOrShortName('Guinea Bissau', false)).to.eql(null);
        });

        it('should return country object when searching alias with useAlias parameter `true`', () => {
          expect(findCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
        });

        it('should return `null` when searching alias with useAlias parameter `true` using short name', () => {
          expect(findCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
        });

        it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(findCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
        });

        it('should return `null` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(findCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
        });

        it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
          expect(findCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
        });
      });
    });

    describe('Province Search #', () => {
      describe('getProvinceByName()', () => {
        it('should be a function', () => {
          expect(getProvinceByName).to.be.a('function');
        });

        it('should return `null` when no provinces', () => {
          expect(getProvinceByName(countries[Andorra.alpha2])).to.eql(null);
        });

        it('should return `null` when no argument', () => {
          expect(getProvinceByName(countries.CA)).to.eql(null);
        });

        it('should return province object when find it', () => {
          expect(getProvinceByName(countries.CA, 'Newfoundland and Labrador')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it by ignoring case', () => {
          expect(getProvinceByName(countries.CA, 'NewfoUndland and LabrAdor')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(getProvinceByName(countries.CA, 'NewfoUndland')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(getProvinceByName(countries.CA, 'NewfoUndland', false)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(getProvinceByName(countries.CA, 'NewfoUndland', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(getProvinceByName(countries.CA, 'LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
        });

        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(getProvinceByName(countries.US, 'caLifoRnia', true)).to.eql(California);
        });
      });

      describe('findProvinceByName()', () => {
        it('should be a function', () => {
          expect(findProvinceByName).to.be.a('function');
        });

        it('should return `null` when no provinces', () => {
          expect(findProvinceByName(countries[Andorra.alpha2])).to.eql(null);
        });

        it('should return `null` when no argument', () => {
          expect(findProvinceByName(countries.CA)).to.eql(null);
        });

        it('should return province object when find it', () => {
          expect(findProvinceByName(countries.CA, 'Newfoundland and Labrador')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it by ignoring case', () => {
          expect(findProvinceByName(countries.CA, 'NewfoUndland and LabrAdor')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(findProvinceByName(countries.CA, 'NewfoUndland')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(findProvinceByName(countries.CA, 'NewfoUndland', false)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(findProvinceByName(countries.CA, 'NewfoUndland', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(findProvinceByName(countries.CA, 'LabrAdor', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(findProvinceByName(countries.US, 'caLifoRnia', true)).to.eql(California);
        });
      });

      describe('getProvinceByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(getProvinceByNameOrShortName).to.be.a('function');
        });

        it('should return `null` when no provinces', () => {
          expect(getProvinceByNameOrShortName(countries[Andorra.alpha2])).to.eql(null);
        });

        it('should return `null` when no argument', () => {
          expect(getProvinceByNameOrShortName(countries.CA)).to.eql(null);
        });

        it('should return province object when find it', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'Newfoundland and Labrador')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it using short name', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NL')).to.eql(NewfoundlandAndLabrador);
        });

        it('should return province object when find it by ignoring case', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NewfoUndland and LabrAdor')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it by ignoring case using short name', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'Nl')).to.eql(NewfoundlandAndLabrador);
        });

        it('should return `null` when country has no short name province', () => {
          expect(getProvinceByNameOrShortName(countries.BO, 'VA')).to.eql(null);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NewfoUndland')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NewfoUndland', false)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NewfoUndland', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when searching alias with useAlias parameter `true` using short name', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'NL', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'LabrAdor', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
          expect(getProvinceByNameOrShortName(countries.CA, 'Nl', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return `null` when country has no short name province with useAlias parameter `true`', () => {
          expect(getProvinceByNameOrShortName(countries.BO, 'VA', true)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(getProvinceByNameOrShortName(countries.US, 'caLifoRnia', true)).to.eql(California);
        });
      });

      describe('findProvinceByNameOrShortName()', () => {
        it('should be a function', () => {
          expect(findProvinceByNameOrShortName).to.be.a('function');
        });

        it('should return `null` when no provinces', () => {
          expect(findProvinceByNameOrShortName(countries[Andorra.alpha2])).to.eql(null);
        });

        it('should return `null` when no argument', () => {
          expect(findProvinceByNameOrShortName(countries.CA)).to.eql(null);
        });

        it('should return province object when find it', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'Newfoundland and Labrador')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it using short name', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'NL')).to.eql(NewfoundlandAndLabrador);
        });

        it('should return province object when find it by ignoring case', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'NewfoUndland and LabrAdor')).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province object when find it by ignoring case using short name', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'Nl')).to.eql(NewfoundlandAndLabrador);
        });

        it('should return `null` when country has no short name province', () => {
          expect(findProvinceByNameOrShortName(countries.BO, 'VA')).to.eql(null);
        });

        it('should return `null` when searching alias with no useAlias parameter', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'NewfoUndland')).to.eql(null);
        });

        it('should return `null` when searching alias with useAlias parameter `false`', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'NewfoUndland', false)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true`', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'NewfoUndland', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
          expect(findProvinceByNameOrShortName(countries.CA, 'LabrAdor', true)).to.eql(
            NewfoundlandAndLabrador,
          );
        });

        it('should return `null` when country has no short name province with useAlias parameter `true`', () => {
          expect(findProvinceByNameOrShortName(countries.BO, 'VA', true)).to.eql(null);
        });

        it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
          expect(findProvinceByNameOrShortName(countries.US, 'caLifoRnia', true)).to.eql(
            California,
          );
        });
      });
    });
  });
});
