import React from "react";
import { loginModuleProps } from "./types";

import LoginRoute from "./LoginRoute";
import RegisterRoute from "./RegisterRoute";

const SwitchRoute: React.FC<loginModuleProps> = ({ ...loginModuleProps }) => {
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
            {loginModuleType === "resetPassword" && (
                <RegisterRoute {...loginModuleProps} />
            )}
        </>
    );
};
export default SwitchRoute;
