import React from "react";
import { FooterCopyrightProps } from "./types";

const FooterCopyright : React.FC<FooterCopyrightProps> = ({
  copyrightInfo
}) => (
<> {copyrightInfo}</>
);

export default FooterCopyright;
