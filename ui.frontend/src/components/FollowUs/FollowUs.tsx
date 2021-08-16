import React from "react";
import { FollowUSProps } from "./types";

const FollowUs : React.FC<FollowUSProps> = ({ links, followUsText } ) => {
    return (
    <div> 
        {links.map(item => <div> Image Path : {item.label}  linkURL : {item.link} </div>)}
        <div>{followUsText}</div>
    </div>
    );
};

export default FollowUs;