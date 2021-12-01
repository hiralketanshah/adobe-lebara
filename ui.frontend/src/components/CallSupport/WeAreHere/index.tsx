import React from "react";
import Button from "../../Button/Button";

import { Text, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { WeAreHereProps } from "../types";

const WeAreHere: React.FC<WeAreHereProps> = ({
  heading,
  description,
  ctaLiveChatLabel,
  ctaLiveChatUrl,
}) => {
  const history = useHistory();
  return (
    <Box
      bg="white"
      px="20px"
      py="30px"
      w={{ base: "100%", lg: "846px" }}
      borderRadius={{ base: "0px", lg: "8px" }}
      mt={{ base: "44px", lg: "35px" }}
      textAlign={{ lg: "center" }}
    >
      {heading && <Text
        fontWeight="bold"
        letterSpacing="-0.01em"
        fontSize="20px"
        lineHeight="40px"
      >
        {heading}
      </Text>}

      {description && <Text letterSpacing="0.25px" fontSize="14px" lineHeight="20px"
        className="rich-text"
        dangerouslySetInnerHTML={{ __html : description }} />}

      <Button
        mt={{ base: "18px", lg: "9px" }}
        w={{ base: "100%", lg: "320px" }}
        bg="cyan"
        onClick={() => history.push(ctaLiveChatUrl || "/")}
        >
        {ctaLiveChatLabel || "Start Live Chat"}
      </Button>
    </Box>
  );

}

export default WeAreHere;
