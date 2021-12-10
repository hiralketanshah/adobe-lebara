import React from "react";
import {SwitchRouteProps} from "./types";
import LoginRoute from "@lebara/ui/src/rotues/LoginRoute";
import RegisterRoute from "@lebara/ui/src/rotues/RegisterRoute";

const SwitchRoute: React.FC<SwitchRouteProps> = ({ ...loginModuleProps }) => {
    const loginModuleType =
        loginModuleProps && Object.keys(loginModuleProps).length
            ? loginModuleProps.loginModuleType
            : null;
console.log(loginModuleProps);
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
