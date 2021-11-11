import moment from "moment";
import { PostpaidDetails, PostpaidDetailsErrors } from "./types";
import {
  emailRegex,
  nameRegex,
  phoneNumberRegex,
} from "../Formik/validations/regeularExpressions";
import {
  DATE_OF_BIRTH_YEAR_RANGE,
  DAY_RANGE,
  MONTH_RANGE,
} from "../../utils/lebara.constants";

export default (values: PostpaidDetails) => {
  const errors: PostpaidDetailsErrors = {};
  if (!values.email) {
    errors.email = "We need your email address to contact you";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please check the email address format";
  }
  if (!values.firstName) {
    errors.firstName = "Please enter First Name";
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = "Please enter valid First Name";
  }
  if (!values.lastName) {
    errors.lastName = "Please enter Last Name";
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = "Please enter valid First Name";
  }
  if (!values.day) {
    errors.day = "Please enter Day";
  } else if (!DAY_RANGE.test(values.day)) {
    errors.day = "Please enter valid Day";
  }

  if (!values.month) {
    errors.month = "Please enter Month";
  } else if (!MONTH_RANGE.test(values.month)) {
    errors.month = "Please enter valid Month";
  }
  if (!values.year) {
    errors.year = "Please enter Year";
  } else if (!DATE_OF_BIRTH_YEAR_RANGE.test(values.year)) {
    errors.year = "Please enter valid Year";
  }

  if (
    !errors.year &&
    !errors.day &&
    !errors.month &&
    values.day &&
    values.month &&
    values.year &&
    moment().diff(
      moment(`${values.year}-${values.month}-${values.day}`, "YYYY-MM-DD"),
      "years"
    ) < 18
  ) {
    errors.year = "You must be older than 18";
  }

  if (!values.shippingAddress) {
    errors.shippingAddress = "Please start typing your address";
  }

  if (values.portInStatus === "Yes") {
    if (!values.portInNumber) {
      errors.portInNumber = "Please enter your number to port";
    } else if (!phoneNumberRegex.test(values.portInNumber)) {
      errors.portInNumber = "Please enter 10-12 digits including 0";
    }
    if (!values.currentProvider) {
      errors.currentProvider = "Please select your previous phone provider";
    }
  }

  return errors;
};
