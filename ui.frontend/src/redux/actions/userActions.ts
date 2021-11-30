import { createAction } from "redux-act";
import { UserInfo } from "../types/userTypes";

export const saveUserInfo = createAction<UserInfo>("save user info");
export const logout = createAction("logout user");
