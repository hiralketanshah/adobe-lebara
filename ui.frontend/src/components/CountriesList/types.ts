export interface CountriesListOption {
  countryName?: string;
  countryFlag?: string; countryCode?: string;
}

export interface CountriesListProps {
  items: CountriesListOption[];
}
