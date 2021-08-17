import React from "react";
import { GetAppProps } from "./types";

const GetApp : React.FC<GetAppProps> = ({appTitle } ) => {
    return (
        <div> 
            <div>Title is {appTitle}</div>
        </div>
    );
};

export default GetApp;
