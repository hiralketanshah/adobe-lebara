import React from "react";
import { EmbedProps } from "./types";

const Embed: React.FC<EmbedProps> = ({
  type,
  url,
  html,
  result,
}) => {
  let allScripts: HTMLScriptElement[] = [];
  let htmlFinal: string = "";
  const nodeScriptReplace = (node: HTMLScriptElement) => {
    if (nodeScriptIs(node) === true) {
      nodeScriptClone(node);
    }
  }

  const nodeScriptClone = (node: HTMLScriptElement) => {
    var script = document.createElement("script");
    script.text = node.innerHTML;
    var i = -1, attrs = node.attributes, attr;
    while (++i < attrs.length) {
      script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    document.head.appendChild(script);
  }

  const nodeScriptIs = (node: HTMLScriptElement) => {
    return node.tagName === 'SCRIPT';
  }

  const stripScripts = (html: string) => {
    let div = document.createElement('div');
    div.innerHTML = html;
    let scripts = div.getElementsByTagName('script');
    let i = scripts.length;
    allScripts = [...scripts];
    while (i--) {
      scripts[i]?.parentNode?.removeChild(scripts[i]);
    }
    htmlFinal = div.innerHTML;
    if (allScripts.length) {
      for (let i = 0; i < allScripts.length; i++) {
        nodeScriptReplace(allScripts[i]);
      };
    }
  }

  return (
    <>
      {type === "URL" && result?.processor === "oembed" && result?.options?.provider === "YouTube" && (
        //@ts-ignore
        <div className="embed" dangerouslySetInnerHTML={{ __html: result?.options?.response?.html || "" }}></div>
      )}
      {type === "HTML" && (
        <>{stripScripts(html)} <div className="embed" dangerouslySetInnerHTML={{ __html: htmlFinal || "" }}></div>
        </>
      )}
    </>
  );
};
export default Embed;
