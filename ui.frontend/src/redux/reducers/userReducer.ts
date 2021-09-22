import { createReducer } from "redux-act";
import produce from "immer";
import { saveUserInfo, saveUserToken } from "../actions/userActions";

export interface UserState {
  token?: string;
  name?: string;
}

const defaultState: UserState = {};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(saveUserInfo, (state, payload) =>
  produce(state, (draft) => {
    draft.name = payload.name;
  })
);
reducer.on(saveUserToken, (state, payload) =>
  produce(state, (draft) => {
    draft.name = payload.token;
  })
);

export default reducer;
