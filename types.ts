export type Maybe<T> = T | null;

export type Province = {
  short?: Maybe<string>;
  name: string;
  alias?: Maybe<string[]>;
  region?: Maybe<string>;
};

export interface CountryRaw {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  ioc: string;
  languages: string[];
  name: string;
  status: string;
  provinces?: Maybe<Array<Province>>;
  alias?: Maybe<string[]>;
}

export interface Country extends CountryRaw {
  getProvinceByName(name?: Maybe<string>, useAlias?: boolean): Maybe<Province>;
  findProvinceByName(name?: Maybe<string>, useAlias?: boolean): Maybe<Province>;
  getProvinceByNameOrShortName(
    nameOrShortName?: Maybe<string>,
    useAlias?: boolean,
  ): Maybe<Province>;
  findProvinceByNameOrShortName(
    nameOrShortName?: Maybe<string>,
    useAlias?: boolean,
  ): Maybe<Province>;
}
