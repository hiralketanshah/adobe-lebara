import React from "react";
import { EmbedProps } from "./types";

const Embed: React.FC<EmbedProps> = ({
  type,
  url,
  html,
  result,
}) => {

  return (
         <>
             {type === "URL" && result?.processor === "oembed" && result?.options?.provider === "YouTube" && (
                //@ts-ignore
                <div className="embed" dangerouslySetInnerHTML={{ __html: result?.options?.response?.html || ""}}></div>
             )}
             {type === "HTML" && (
                 <div className="embed" dangerouslySetInnerHTML={{ __html: html || ""}}></div>
              )}
         </>
     );
};
export default Embed;
