import { createReducer } from "redux-act";
import produce from "immer";
import { saveTopUps } from "../actions/topUpActions";

export interface TopUpsState {
  items: number[];
}

const defaultState: TopUpsState = {
  items: [],
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(saveTopUps, (state, payload) =>
  produce(state, (draft) => {
    draft.items = payload;
  })
);

export default reducer;
