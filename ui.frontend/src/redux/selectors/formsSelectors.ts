import { ReduxState } from "../types";
import { FormName } from "../types/formsTypes";

export const selectFormValues = (formName: FormName) => (state: ReduxState) =>
state?.forms ? state?.forms[formName] : {};
