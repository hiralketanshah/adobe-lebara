import React from "react";
import {SwitchRouteProps} from "./types";
import LoginRoute from "@lebara/core/routes/LoginRoute";
import RegisterRoute from "@lebara/core/routes/RegisterRoute";

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
