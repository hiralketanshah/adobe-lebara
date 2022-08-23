import { ReduxState } from "../types";

export const selectIsLoading = (state: ReduxState) => state.loading.isLoading;
