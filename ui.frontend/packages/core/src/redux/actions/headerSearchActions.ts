import { createAction } from "redux-act";
import { HeaderSearchType } from "../types/headerSearchTypes";

export const headerSearch = createAction<HeaderSearchType>(
  "header search clicked"
);
