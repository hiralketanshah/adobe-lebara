import { MenuOption } from "../components/Header/types";

// Regex for input fields
export const ADDRESS_FIELD_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$/;
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