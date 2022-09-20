import { createReducer } from "redux-act";
import produce from "immer";
import { headerSearch } from "../actions/headerSearchActions";

export interface HeaderSearchBoxOpenedState {
  key: boolean;
}

const defaultState: HeaderSearchBoxOpenedState = {
  key: false,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(headerSearch, (state, payload) =>
  produce(state, (draft) => {
    draft.key = payload.key;
  })
);

export default reducer;
