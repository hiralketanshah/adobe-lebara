import React from "react";
import { FooterUpperLinksProps } from "./types";

const FooterUpperLinks : React.FC<FooterUpperLinksProps> = ({ links } ) => {
    return (
        <div>
            {links?.map(item => 
                <div>
                     parentlinkLabel : {item?.parentLinks?.label}
                </div>            
            )}
        </div>
    );
};

export default FooterUpperLinks;
