import { createReducer } from "redux-act";
import produce from "immer";
import { logout, saveUserInfo, saveUserToken } from "../actions/userActions";

export interface UserState {
  token?: string;
  name?: string;
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

reducer.on(saveUserToken, (state, payload) =>
  produce(state, (draft) => {
    draft.name = payload.token;
  })
);

export default reducer;
