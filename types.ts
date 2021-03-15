export type Maybe<T> = T | null;

export type Province = {
  short?: Maybe<string>;
  name: string;
  alias?: Maybe<string[]>;
  region?: Maybe<string>;
};

export interface Country {
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
