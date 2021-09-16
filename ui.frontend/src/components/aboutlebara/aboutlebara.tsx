// @ts-nocheck
import React from "react";
import { Box } from "@chakra-ui/react";
import TextFeature from "./TextFeature";
import { AboutLebaraProps } from "./types";
const Aboutlebara: React.FC<AboutLebaraProps> = (props) => (
  <Box {...(!props.noBgColor ? { backgroundColor: '#3D4998' } : {})} py={{ lg: "47px" }} px={{ lg: "70px" }}>
    <TextFeature {...props} />
  </Box>
);

export default Aboutlebara;
