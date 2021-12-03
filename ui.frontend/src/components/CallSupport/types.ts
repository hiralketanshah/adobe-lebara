import { SelectOption } from "../Select/types";

export interface CallSupportProps {
  lastName?: string;
  helpText: string;

  heading?: string;
  description?: string;
  callbackMessageText?: string;
  firstName?: string;
  firstNameError?: string;
  lastname?: string;
  lastnameError?: string;
  email?: string;
  emailEmptyError?: string;
  emailInvalidError?: string;
  subject?: string;
  subjectError?: string;
  dropDownValues?: SelectOption[];
  helplabel?: string;
  helpError?: string;
  requestText?: string;
  attachment?: string;
  attachmentDescription?: string;
  submitLabel?: string;
  separatorText?: string;
}