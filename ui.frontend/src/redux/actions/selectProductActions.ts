import { createAction } from "redux-act";
import { SelectedProduct } from "../types/productTypes";

export const selectProduct = createAction<SelectedProduct>("select product");
