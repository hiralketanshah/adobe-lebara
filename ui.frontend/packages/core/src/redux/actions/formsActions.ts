import { createAction } from "redux-act";
import { SaveFormDetails } from "../types/formsTypes";

export const saveFormDetails =
  createAction<SaveFormDetails>("save form details");

export const resetForms = createAction("reset forms");
