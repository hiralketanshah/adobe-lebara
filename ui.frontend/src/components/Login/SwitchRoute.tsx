import React from "react";
import { loginModuleProps } from "./types";
import LoginRoute from "@lebara/ui/src/rotues/LoginRoute";
import RegisterRoute from "@lebara/ui/src/rotues/RegisterRoute";

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
        </>
    );
};
export default SwitchRoute;
