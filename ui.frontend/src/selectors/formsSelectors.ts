import { ReduxState } from "../redux/types";
import { FormName } from "../redux/types/formsTypes";

export const selectFormValues = (formName: FormName) => (state: ReduxState) =>
state.forms ? state?.forms[formName] : {};
