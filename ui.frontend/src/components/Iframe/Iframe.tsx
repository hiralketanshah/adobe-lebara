import React from "react";
import { IframeProps } from "./types";

const IframeComp = ({url, width, height}: any) => {
    return(
      <div style={{border: '0'}}>
        <iframe src={url || "/"}
          width={width || '100%'}
          height={height || '100%'}
          style={{border: 'none', height: '650px', background: 'none'}}
          title=""
          />
      </div>
    )
};

const Iframe: React.FC<IframeProps> = ({
  url,
  height,
  width,
}) => {
  if(!url || url === "") return null;
  return (<IframeComp url={url} width={width} height={height} />);
};

export default Iframe;
