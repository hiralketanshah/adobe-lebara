import { ReduxState } from "../redux/types";

export const selectIsLoading = (state: ReduxState) => state.loading.isLoading;
