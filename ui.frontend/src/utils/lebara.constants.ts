
// Regex for input fields
export const STREET_REGEX =
  /^[A-Za-z0-9ÀàÂâÆæÄäÇçÈèÉéÊêËëÎîÏïÖöÔôŒœÙùÛûÜü€?ÿŸß\-,_\\.\s\\']{0,255}$/;
export const HOUSE_NUMBER_REGEX =
  /^[0-9]\d{0,4}(?:[ -]?(?:[a-zA-Z]+|\d{0,4}\D{0,4}))?$/;
export const ZIP_CODE_REGEX = /^[0-9]{5}$/;
export const ADDRESS_FIELD_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$/;
export const TOWN_CITY_FIELD_PATTERN = /^[a-zA-Z]+[a-zA-Z]*$/;
export const NUMBER_FIELD_PATTERN = /^[0-9]*$/;
export const ALPHA_NUMERIC_FIELD_PATTERN = /^[a-zA-Z0-9]*$/;
export const NAME_FIELD_PATTERN = /^[ A-Za-z0-9 '-]*$/;
export const EMAIL_FIELD_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const DAY_RANGE = /^(0?[1-9]|1[0-9]|2[0-9]|3(0|1))$/;
export const MONTH_RANGE = /^(0?[1-9]|1[0-2])$/;
export const DATE_OF_BIRTH_YEAR_RANGE = /^(194[5-9]|19[5-9]\d|200\d|201[0-9])$/;
export const YEAR_RANGE = /^(202[1-9]|20[5-9]\d|202\d|202[1-9])$/;
export const DE_MOBILE_NUMBER_PATTERN =
  /^([0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2})$/;
export const PASSWORD_TYPE_EMAIL = "emailAddress";
export const PASSWORD_TYPE_MOBILE_NUMBER = "mobileNumber";
export const BACKGROUND_OPACITY_SAERCH_BAR = "0.45";

export const recentSearches: string[] = [
  "Data Pack",
  "SIM Registration",
  "Roaming",
  "My Lebara",
  "Calling ",
];

export const mostSearchesFromUsers: string[] = [
  "My Validity",
  "Postpaid",
  "My Current Plans",
];

export const ADD = "Add";
export const EDIT = "Edit";

export const PROJECT_URL_ROOT = "/content/lebara/de";
