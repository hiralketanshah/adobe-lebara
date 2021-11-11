import moment from "moment";
import { PostpaidDetails, PostpaidDetailsErrors, ValidationMessages } from "./types";
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

export default (values: PostpaidDetails, validationMessages: ValidationMessages) => {
  const errors: PostpaidDetailsErrors = {};
  if (!values.email) {
    errors.email = validationMessages.emailRequiredMsg;
  } else if (!emailRegex.test(values.email)) {
    errors.email = validationMessages.emailInValidMsg;
  }
  if (!values.firstName) {
    errors.firstName = validationMessages.fNameRequiredMsg;
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = validationMessages.fNameInValidMsg;
  }
  if (!values.lastName) {
    errors.lastName = validationMessages.lNameRequiredMsg;
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = validationMessages.lNameInValidMsg;
  }
  if (!values.day) {
    errors.day = validationMessages.dayRequiredMsg;
  } else if (!DAY_RANGE.test(values.day)) {
    errors.day = validationMessages.dayInValidMsg;
  }
  if (!values.month) {
    errors.month = validationMessages.monthRequiredMsg;
  } else if (!MONTH_RANGE.test(values.month)) {
    errors.month = validationMessages.monthInValidMsg;
  }
  if (!values.year) {
    errors.year = validationMessages.yearRequiredMsg;
  } else if (!DATE_OF_BIRTH_YEAR_RANGE.test(values.year)) {
    errors.year = validationMessages.yearInValidMsg;
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
    errors.year = validationMessages.yearInvalidAgeMsg;
  }

  if (!values.shippingAddress) {
    errors.shippingAddress = validationMessages.shippingRequiredMsg;
  }

  if (values.portInStatus === "Yes") {
    if (!values.portInNumber) {
      errors.portInNumber = validationMessages.portInNumberRequiredMsg;
    } else if (!phoneNumberRegex.test(values.portInNumber)) {
      errors.portInNumber = validationMessages.portInNumberInValidMsg;
    }
    if (!values.currentProvider) {
      errors.currentProvider = validationMessages.currentProviderRequiredMsg;
    }
  }

  return errors;
};
