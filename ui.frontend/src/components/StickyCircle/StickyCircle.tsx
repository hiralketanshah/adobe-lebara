import React from "react";
import { Text, Box, Button, Circle } from "@chakra-ui/react";
import { StickyCircleProps } from "./types";
import { useHistory } from "react-router-dom";

const StickyCircle: React.FC<StickyCircleProps> = ({
  linkLabel,
  linkPath
}) => {
  const history = useHistory();
  return (
    <>
     <style>{`
    .editor-panel-active .stickycircle{
        position: static;
    }
  `}</style>
        <Box
          position="fixed"
          display={{ lg: "inline-block", base: "none" }}
          left={{ lg: "calc(50% + 387px)", base: "50px" }}
          top="450px"
          className="stickycircle"
        >
          <Circle
            size="72px"
            bg="secondary.500"
            color="white"
            textAlign="center"
          >
            <Button
              display="flex"
              flexDirection="column"
              bg="secondary.500"
              _hover={{ bg: "secondary.500", background: "none" }}
              _active={{ bg: "secondary.500", borderColor: "secondary.500", background: "none" }}
              onClick={() => history.push(linkPath || "/")}
              _focus={{
                outline: "none",
              }}
              background="none"
            >
              <Text textTransform="capitalize" fontSize="17px" color="white" whiteSpace="break-spaces">
                {linkLabel}
              </Text>
            </Button>
          </Circle>
        </Box>
    </>
  );
}

export default StickyCircle;
