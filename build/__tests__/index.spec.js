"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const chai_1 = require("chai");
const index_1 = __importStar(require("../index"));
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
            chai_1.expect(index_1.json).to.be.an('array');
        });
        it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status`, `provinces` and `alias` as object keys', () => {
            index_1.json.forEach((country) => {
                chai_1.expect(country).to.have.all.keys([
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
            chai_1.expect(index_1.default[Andorra.alpha2]).to.be.an('object');
        });
        it('should have `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`, `ioc`, `languages`, `name`, `status` `provinces`, `alias`, getProvinceByName` and `findProvinceByName` as object keys', () => {
            Object.keys(index_1.default).forEach((key) => {
                if (lodash_1.default.isString(key) && key.length === 2) {
                    chai_1.expect(index_1.default[key]).to.have.all.keys([
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
                    chai_1.expect(index_1.getCountryByName).to.be.a('function');
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.getCountryByName()).to.eql(null);
                });
                it('should return country object when find it', () => {
                    chai_1.expect(index_1.getCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
                });
                it('should return country object by ignoring case', () => {
                    chai_1.expect(index_1.getCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.getCountryByName('Guinea Bissau')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.getCountryByName('Guinea Bissau', false)).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.getCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
                });
                it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.getCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
                });
                it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
                    chai_1.expect(index_1.getCountryByName('Andorra', true)).to.eql(Andorra);
                });
            });
            describe('findCountryByName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.findCountryByName).to.be.a('function');
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.findCountryByName()).to.eql(null);
                });
                it('should return country object when find it', () => {
                    chai_1.expect(index_1.findCountryByName('Guinea-Bissau')).to.eql(GuineaBissau);
                });
                it('should return country object when find it by ignoring case', () => {
                    chai_1.expect(index_1.findCountryByName('GuiNea-BisSau')).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.findCountryByName('Guinea Bissau')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.findCountryByName('Guinea Bissau', false)).to.eql(null);
                });
                it('should return country object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.findCountryByName('Guinea Bissau', true)).to.eql(GuineaBissau);
                });
                it('should return country object by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.findCountryByName('GuiNea BisSau', true)).to.eql(GuineaBissau);
                });
                it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
                    chai_1.expect(index_1.findCountryByName('Andorra', true)).to.eql(Andorra);
                });
            });
            describe('getCountryByNameOrShortName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName).to.be.a('function');
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName()).to.eql(null);
                });
                it('should return country object when find it', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
                });
                it('should return country object when find it using short name', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
                });
                it('should return country object by ignoring case', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
                });
                it('should return country object by ignoring case using short name', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Guinea Bissau')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Guinea Bissau', false)).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
                });
                it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
                });
                it('should return `null` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
                });
                it('should return country object when searching alias with useAlias parameter `true` and country has no province', () => {
                    chai_1.expect(index_1.getCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
                });
            });
            describe('findCountryByNameOrShortName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName).to.be.a('function');
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName()).to.eql(null);
                });
                it('should return country object when find it', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Guinea-Bissau')).to.eql(GuineaBissau);
                });
                it('should return country object when find it using short name', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('GW')).to.eql(GuineaBissau);
                });
                it('should return country object when find it by ignoring case', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('GuiNea-BisSau')).to.eql(GuineaBissau);
                });
                it('should return country object when find it by ignoring case using short name', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Gw')).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Guinea Bissau')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Guinea Bissau', false)).to.eql(null);
                });
                it('should return country object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Guinea Bissau', true)).to.eql(GuineaBissau);
                });
                it('should return `null` when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('GW', true)).to.eql(GuineaBissau);
                });
                it('should return `null` by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('GuiNea BisSau', true)).to.eql(GuineaBissau);
                });
                it('should return `null` by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Gw', true)).to.eql(GuineaBissau);
                });
                it('should return country object when searching alias with useAlias parameter `true` and country has no alias', () => {
                    chai_1.expect(index_1.findCountryByNameOrShortName('Andorra', true)).to.eql(Andorra);
                });
            });
        });
        describe('Province Search #', () => {
            describe('getProvinceByName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].getProvinceByName).to.be.a('function');
                });
                it('should return `null` when no provinces', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].getProvinceByName()).to.eql(null);
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName()).to.eql(null);
                });
                it('should return province object when find it', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('NewfoUndland')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('NewfoUndland', false)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
                    chai_1.expect(index_1.default.US.getProvinceByName('caLifoRnia', true)).to.eql(California);
                });
            });
            describe('findProvinceByName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].findProvinceByName).to.be.a('function');
                });
                it('should return `null` when no provinces', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].findProvinceByName()).to.eql(null);
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName()).to.eql(null);
                });
                it('should return province object when find it', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('NewfoUndland')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('NewfoUndland', false)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
                    chai_1.expect(index_1.default.US.findProvinceByName('caLifoRnia', true)).to.eql(California);
                });
            });
            describe('getProvinceByNameOrShortName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].getProvinceByNameOrShortName).to.be.a('function');
                });
                it('should return `null` when no provinces', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].getProvinceByNameOrShortName()).to.eql(null);
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName()).to.eql(null);
                });
                it('should return province object when find it', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it using short name', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NL')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case using short name', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('Nl')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when country has no short name province', () => {
                    chai_1.expect(index_1.default.BO.getProvinceByNameOrShortName('VA')).to.eql(null);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NewfoUndland')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NewfoUndland', false)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('NL', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province by ignoring case when searching alias with useAlias parameter `true` using short name', () => {
                    chai_1.expect(index_1.default.CA.getProvinceByNameOrShortName('Nl', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when country has no short name province with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.BO.getProvinceByNameOrShortName('VA', true)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
                    chai_1.expect(index_1.default.US.getProvinceByNameOrShortName('caLifoRnia', true)).to.eql(California);
                });
            });
            describe('findProvinceByNameOrShortName()', () => {
                it('should be a function', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].findProvinceByNameOrShortName).to.be.a('function');
                });
                it('should return `null` when no provinces', () => {
                    chai_1.expect(index_1.default[Andorra.alpha2].findProvinceByNameOrShortName()).to.eql(null);
                });
                it('should return `null` when no argument', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName()).to.eql(null);
                });
                it('should return province object when find it', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('Newfoundland and Labrador')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it using short name', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('NL')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('NewfoUndland and LabrAdor')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province object when find it by ignoring case using short name', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('Nl')).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when country has no short name province', () => {
                    chai_1.expect(index_1.default.BO.findProvinceByNameOrShortName('VA')).to.eql(null);
                });
                it('should return `null` when searching alias with no useAlias parameter', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('NewfoUndland')).to.eql(null);
                });
                it('should return `null` when searching alias with useAlias parameter `false`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('NewfoUndland', false)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('NewfoUndland', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return province by ignoring case when searching alias with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.CA.findProvinceByNameOrShortName('LabrAdor', true)).to.eql(NewfoundlandAndLabrador);
                });
                it('should return `null` when country has no short name province with useAlias parameter `true`', () => {
                    chai_1.expect(index_1.default.BO.findProvinceByNameOrShortName('VA', true)).to.eql(null);
                });
                it('should return province object when searching alias with useAlias parameter `true` and province has no alias', () => {
                    chai_1.expect(index_1.default.US.findProvinceByNameOrShortName('caLifoRnia', true)).to.eql(California);
                });
            });
        });
    });
});
