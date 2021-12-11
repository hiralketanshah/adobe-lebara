import React from "react";
import { IframeProps } from "./types";

const Iframe: React.FC<IframeProps> = ({
  url,
  height,
  width,
}) => {

  return (
         <>
             {url !== '' && (
                //@ts-ignore
                <iframe src={url} height={height || 250} width={width || 250} frameborder="0"></iframe>
             )}
         </>
     );
};
export default Iframe;
