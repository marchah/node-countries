declare namespace nodeCountries {
  type Province = {
    short?: string | undefined;
    name: string;
    alias?: string | undefined;
  };
  type Country = {
    alpha2: string;
    alpha3: string;
    countryCallingCodes: string[];
    currencies: string[];
    ioc: string;
    languages: string[];
    name: string;
    status: string;
    provinces?: Array<Province>;
    alias?: string | undefined;
    getProvinceByName(name: string, useAlias?: boolean): Province | undefined;
    findProvinceByName(name: string, useAlias?: boolean): Province | undefined;
    getProvinceByNameOrShortName(
      nameOrShortName: string,
      useAlias?: boolean
    ): Province | undefined;
    findProvinceByNameOrShortName(
      nameOrShortName: string,
      useAlias?: boolean
    ): Province | undefined;
  };

  interface NodeCountries {
    getCountryByName(name: string, useAlias?: boolean): Country | undefined;
    findCountryByName(name: string, useAlias?: boolean): Country | undefined;
    getCountryByNameOrShortName(
      nameOrShortName: string,
      useAlias?: boolean
    ): Country | undefined;
    findCountryByNameOrShortName(
      nameOrShortName: string,
      useAlias?: boolean
    ): Country | undefined;
    JSON: { [countryCode in string]: Country };
  }
}

declare const nodeCountries: nodeCountries.NodeCountries;
export = nodeCountries;
