import { createReducer } from "redux-act";
import produce from "immer";
import { setLoading } from "../actions/loadingActions";

export interface LoadingState {
  isLoading: boolean;
}

const defaultState: LoadingState = {
  isLoading: true,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);
reducer.on(setLoading, (state, payload) =>
  produce(state, (draft) => {
    draft.isLoading = payload;
  })
);

export default reducer;
