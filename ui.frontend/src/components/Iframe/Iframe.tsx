import React from "react";
import { IframeProps } from "./types";

const IframeComp = ({url, height}: any) => {
    return(
      <div style={{border: '0', height: height || '500px' }}>
        <iframe src={url || "/"}
          width={'100%'}
          height={'100%'}
          style={{border: 'none', background: 'none'}}
          title=""
          />
      </div>
    )
};

const Iframe: React.FC<IframeProps> = ({
  url,
  height,
}) => {
  if(!url || url === "") return null;
  return (<IframeComp url={url} height={height} />);
};

export default Iframe;
