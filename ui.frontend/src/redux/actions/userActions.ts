import { createAction } from "redux-act";
import { UserInfo, UserToken } from "../types/userTypes";

export const saveUserInfo = createAction<UserInfo>("save user info");

export const saveUserToken = createAction<UserToken>("save user token");
