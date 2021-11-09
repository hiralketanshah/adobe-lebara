// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import TextFeature from "./TextFeature";
import { AboutLebaraProps } from "./types";
const AboutLebara: React.FC<AboutLebaraProps> = (props) => {
  const nodeRef= useRef();
  const { backgroundColor } = props;

  useEffect(() => {
    const setStyle = () => {
      if (!nodeRef.current.parentNode.parentElement.classList.contains("cmp-carousel__item")) {
        nodeRef.current.style.background = backgroundColor; 
        nodeRef.current.firstChild.lastElementChild.classList.add('custom-md-w50');
      } else {
        nodeRef.current.firstChild.lastElementChild.classList.add('custom-md-width');
      }
    }
    setStyle();
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box className='about-lebara'  ref={nodeRef}  py={{ lg: "47px" }} px={{ lg: "70px" }}>
      <TextFeature {...props} />
    </Box>
  )
}
export default AboutLebara;
