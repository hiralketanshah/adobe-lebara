export interface InternationalRatesProps {
   selectCountryLabel: string;
   countryLabel: string;
   description: string;
   landlineLabel: string;
   mobileLabel: string;
   smsLabel: string;
   landlineCallRate: string;
   mobileCallRate: string;
   smsRate: string;
   countryList: CountryList[];
 }

 export interface CountryList {
   label: string;
   value: string;
 }