import React from "react";
import { FooterCopyrightProps } from "./types";

const FooterCopyright : React.FC<FooterCopyrightProps> = ({ copyrightInfo }) => (
<> {copyrightInfo.map(item => <> <>{item.label}</> <>{item.link}</> </>)}</>
);

export default FooterCopyright;
