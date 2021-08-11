import React from "react";
import { FooterUpperLinksProps } from "./types";

const FooterUpperLinks : React.FC<FooterUpperLinksProps> = ({ links } ) => {
    return (
        <div>
            {links?.map(item => 
                <div> parentlinkLabel : {item?.parentLinks.label} parentlink : {item?.parentLinks.link} childlinks : {item?.childLinks?.map(item => <p>  childlink : {item} </p>)}
            </div>            
            )}
        </div>
    );
};

export default FooterUpperLinks;
