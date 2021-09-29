import React from "react";
import { Box } from "@chakra-ui/react";
import { TrustedShopsStarProps } from "./types";

const TrustedShopsStar: React.FC<TrustedShopsStarProps> = () => (
  <Box
    _before={{
      fontSize: "22px",
      color: "#e5e5e5",
      lineHeight: "26px",
    }}
  />
);

export default TrustedShopsStar;
