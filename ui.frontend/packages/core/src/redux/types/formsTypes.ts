export interface SaveFormDetails {
  formName: FormName;
  values: any;
}

export type FormName =
  | "personalDetails"
  | "portIn"
  | "postpaidPersonalDetails"
  | "simChoice"
  | "order-details"
  | "postpaid"
  | "mobileFromAnotherOperator";
