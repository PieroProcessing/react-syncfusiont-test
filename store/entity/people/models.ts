export interface PeopleSlice {
  isLoading: boolean | undefined;
  isSuccess: boolean | undefined;
  isError: boolean | undefined;
  data: {
    people: People[] | undefined;
    size: number;
  };
  error: unknown;
}

export interface City {
  Name: string;
  CountryRegion: string;
  Region: string;
}

export interface AddressInfo {
  Address: string;
  City: City;
}

export interface HomeAddress {
  Address?: string;
  City?: any;
}
export interface People {
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName?: any;
  Gender: string;
  Age?: any;
  Emails: string[];
  FavoriteFeature: string;
  Features: string[];
  AddressInfo: AddressInfo[];
  HomeAddress: HomeAddress;
  Budget?: number;
  BossOffice?: any;
  Cost?: number;
}
export interface PeopleDTO {
  value: People[];
}
