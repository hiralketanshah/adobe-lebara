import React from "react";
import { FollowUSProps } from "./types";

const FollowUSObj : React.FC<FollowUSProps> = ({ links, followUsText } ) => {
    return (
    <div> 
        {links.map(item => <div> Image Path : {item.iconImage}  linkURL : {item.link} </div>)}
        <div>{followUsText}</div>
    </div>
    );
};

export default FollowUSObj;