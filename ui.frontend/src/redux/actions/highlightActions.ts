import { createAction } from "redux-act";
import { HighlightButton } from "../types/highlightButtonTypes";

export const highlightButton =
  createAction<HighlightButton>("highlight button");
