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

export default (values: PostpaidDetails, validationMessages:PostpaidDetailsErrors) => {
  const errors: PostpaidDetails = {};
  if (!values.email) {
    errors.email = validationMessages.emailRequiredMsg;
  } else if (!emailRegex.test(values.email)) {
    errors.email = validationMessages.emailInValidMsg;
  }
  if (!values.firstName) {
    errors.firstName = validationMessages.fNameRequiredMsg;
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = validationMessages.fNameInvalidMsg;
  }
  if (!values.lastName) {
    errors.lastName = validationMessages.lNameRequiredMsg;
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = validationMessages.lNameInvalidMsg;
  }
  if (!values.day) {
    errors.day = validationMessages.dayRequiredMsg;
  } else if (!DAY_RANGE.test(values.day)) {
    errors.day = validationMessages.dayInvalidMsg;
  }
  if (!values.month) {
    errors.month = validationMessages.monthRequiredMsg;
  } else if (!MONTH_RANGE.test(values.month)) {
    errors.month = validationMessages.monthInvalidMsg;
  }
  if (!values.year) {
    errors.year = validationMessages.yearRequiredMsg;
  } else if (!DATE_OF_BIRTH_YEAR_RANGE.test(values.year)) {
    errors.year = validationMessages.yearInvalidMsg;
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
