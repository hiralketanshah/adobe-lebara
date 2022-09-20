import { createReducer } from "redux-act";
import produce from "immer";
import { selectNumber } from "../actions/selectNumberActions";

export interface SelectedNumberState {
  currentNumber: string;
}

const defaultState: SelectedNumberState = {
  currentNumber: "",
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(selectNumber, (state, payload) =>
  produce(state, (draft) => {
    draft.currentNumber = payload;
  })
);

export default reducer;
