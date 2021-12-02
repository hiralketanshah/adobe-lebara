import { createReducer } from "redux-act";
import produce from "immer";
import { logout, saveUserInfo } from "../actions/userActions";

export interface UserState {
  email?: string;
  crmId?: string;
  msisdn?: string[];
  isAuthenticated: boolean;
}

const defaultState: UserState = {
  isAuthenticated: false,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer
  .on(saveUserInfo, (state, payload) =>
    produce(state, (draft) => {
      draft.crmId = payload.crmId;
      draft.email = payload.email;
      draft.msisdn = payload.msisdn;
      draft.isAuthenticated = true;
    })
  )
  .on(logout, (state) =>
    produce(state, (draft) => {
      draft.crmId = undefined;
      draft.email = undefined;
      draft.msisdn = undefined;
      draft.isAuthenticated = false;
    })
  );

export default reducer;
