import React from "react";
import { FooterUpperLinksProps } from "./types";

const FooterUpperLinks : React.FC<FooterUpperLinksProps> = ({ links } ) => {
    return (
        <div>
            {links?.map(
                item => 
                        <>  
                            <div> parent Page
                                <div>
                                parentlinkLabel : {item?.parentLinks?.label}
                                </div>
                                <div>
                                parentlink : {item?.parentLinks?.link}
                                </div>
                            </div>

                            <div>child pages 
                                {item?.childLinks?.map(
                                    item => 
                                            <div>
                                                label : {item?.label}  link: {item?.link}
                                            </div>
                                )}
                            </div>
                            <p>------------------------------------------------------</p>

                        </>
                                    
            )}
        </div>
    );
};

export default FooterUpperLinks;
