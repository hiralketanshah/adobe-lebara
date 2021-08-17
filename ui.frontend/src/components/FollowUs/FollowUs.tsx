import React from "react";
import { FollowUSProps } from "./types";

const FollowUs : React.FC<FollowUSProps> = ({  followUsText } ) => {
    return (
    <div> 
        <div>{followUsText}</div>
    </div>
    );
};

export default FollowUs;