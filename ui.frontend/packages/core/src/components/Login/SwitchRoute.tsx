import React from "react";
import {SwitchRouteProps} from "./types";
import LoginRoute from "@lebara/core/rotues/LoginRoute";
import RegisterRoute from "@lebara/core/rotues/RegisterRoute";

const SwitchRoute: React.FC<SwitchRouteProps> = ({ ...loginModuleProps }) => {
    const loginModuleType =
        loginModuleProps && Object.keys(loginModuleProps).length
            ? loginModuleProps.loginModuleType
            : null;
    return (
        <>
            {loginModuleType === "loginGuest" && (
                <LoginRoute {...loginModuleProps} />
            )}
            {loginModuleType === "loginRegistration" && (
                <RegisterRoute {...loginModuleProps} />
            )}
        </>
    );
};
export default SwitchRoute;
