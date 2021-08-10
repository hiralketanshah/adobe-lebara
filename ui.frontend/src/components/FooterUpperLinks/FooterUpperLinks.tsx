import React from "react";
import { FooterUpperLinksProps } from "./types";

const FooterUpperLinks : React.FC<FooterUpperLinksProps> = ({ footerUpperLinks } ) => {
    return (
        <div>
            {footerUpperLinks?.map(item => <div> label : {item?.label}  link : {item?.link} </div>)}
        </div>
    );
};

export default FooterUpperLinks;
