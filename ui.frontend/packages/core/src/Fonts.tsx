import { Global } from "@emotion/react";
import * as React from "react";

const Fonts = () => (
  <Global
    styles={`
            @font-face {
                font-family: 'Chiswick Grotesque Lebara';
                font-weight: 300;
                src: url("/etc.clientlibs/lebara/clientlibs/clientlib-react-${window?.lebaraGlobalConfigs?.country}/resources/fonts/ChiswickGrotesqueLebaraLight.otf") format("opentype");
            }
            
            @font-face {
                font-family: 'Chiswick Grotesque Lebara';                
                font-weight: 500;
                src: url("/etc.clientlibs/lebara/clientlibs/clientlib-react-${window?.lebaraGlobalConfigs?.country}/resources/fonts/ChiswickGrotesqueLebaraRegular.otf") format("opentype");
            }
            @font-face {
                font-family: 'Chiswick Grotesque Lebara';                
                font-weight: 600;
                src: url("/etc.clientlibs/lebara/clientlibs/clientlib-react-${window?.lebaraGlobalConfigs?.country}/resources/fonts/ChiswickGrotesqueLebaraSemibold.otf") format("opentype");
            }
            
            @font-face {
                font-family: 'Chiswick Grotesque Lebara';                
                font-weight: 700;
                src: url("/etc.clientlibs/lebara/clientlibs/clientlib-react-${window?.lebaraGlobalConfigs?.country}/resources/fonts/ChiswickGrotesqueLebaraBold.otf") format("opentype");
            }
      `}
  />
);
export default Fonts;