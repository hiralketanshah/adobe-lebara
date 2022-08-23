import { createReducer } from "redux-act";
import produce from "immer";
import { resetForms, saveFormDetails } from "../actions/formsActions";

export interface FormsState {
  [key: string]: any;
}

const defaultState: FormsState = {};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer
  .on(saveFormDetails, (state, { formName, values }) =>
    produce(state, (draft) => {
      draft[formName] = values;
    })
  )
  .on(resetForms, (state) =>
    produce(state, (draft) => {
      draft.personalDetails = {};
      draft.portIn = {};
      draft.postpaidPersonalDetails = {};
      draft.simChoice = {};
      draft["order-details"] = {};
      draft.mobileFromAnotherOperator = {};
    })
  );

export default reducer;
