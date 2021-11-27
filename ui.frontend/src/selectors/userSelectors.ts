import { ReduxState } from "../redux/types";

export const selectMsisdn = (state: ReduxState) =>
  state.user.msisdn && state.user.msisdn.length > 0
    ? state.user.msisdn[0]
    : undefined;
export const selectIsAuthenticated = (state: ReduxState) =>
  state.user.isAuthenticated;
export const selectEmail = (state: ReduxState) => state.user.email;
