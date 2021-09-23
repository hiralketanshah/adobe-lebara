import { createReducer } from "redux-act";
import produce from "immer";
import { highlightButton } from "../actions/highlightActions";

export interface HighlightButtonState {
  key: number;
}

const defaultState: HighlightButtonState = {
  key: 1,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(highlightButton, (state, payload) =>
  produce(state, (draft) => {
    draft.key = payload.key;
  })
);

export default reducer;
