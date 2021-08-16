import React from "react";
import { FooterCopyrightProps } from "./types";

const FooterCopyright : React.FC<FooterCopyrightProps> = ({ links, copyrightText } ) => {
    return (
        <div> 
            {links?.map(item => <div> label : {item?.label}  link : {item?.link} </div>)}
            <div>copyrightText is {copyrightText}</div>
        </div>
    );
};

export default FooterCopyright;
