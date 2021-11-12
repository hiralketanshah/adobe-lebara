import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TextWithMoreButtonProps } from "./types";
import Button from "../Button/Button";

const TextWithMoreButton: React.FC<TextWithMoreButtonProps> = ({
  fontSize,
  previewText,
  lineHeight,
  children,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = (event: any) => {
    event.preventDefault();
    setExpanded(true);
  };
  return (
    <Box>
      <Text {...rest} fontSize={fontSize} lineHeight={lineHeight}>
        {!expanded && previewText} {!expanded && " "}
        {!expanded && (
          <Button
            variant="unstyled"
            color="secondary.500"
            height="auto"
            textTransform="none"
            fontWeight="400"
            lineHeight={lineHeight}
            verticalAlign="baseline"
            fontSize={fontSize}
            onClick={handleClick}
          >
            more...
          </Button>
        )}
        {expanded && children}
      </Text>
    </Box>
  );
};

export default TextWithMoreButton;
