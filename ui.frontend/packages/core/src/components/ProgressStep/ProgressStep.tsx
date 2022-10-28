import React from "react";
import { Divider, Flex, Text, Box, Center } from "@chakra-ui/react";
import { ProgressStepProps } from "./types";
import ProgressStepEllipse from "@lebara/core/components/ProgressStepEllipse/ProgressStepEllipse";

const ProgressStep: React.FC<ProgressStepProps> = ({
  activeStepIndex,
  borderBoxMode,
  pageLinks,
  isSmallWidth,
  isWhiteBackground
}) => {
  const lastStepIndex = pageLinks?.length - 1;
  return (
    <Center paddingX={"20px"} mb={"10px"}>
    <Box w="100%" {...isSmallWidth  && {maxW: "846px"}} {...isWhiteBackground && {bg: {lg: "white"}}} mt={"35px"} px={{ lg: "60px" }}>
      <Flex alignItems="center" gridGap="4px" height="72px" my="12px">
        {pageLinks?.map((step, index) => (
          <>
            <Flex
              flexDirection="column"
              alignItems="center"
              position="relative"
              zIndex={1}
            >
              <ProgressStepEllipse
                number={index + 1}
                isActive={index === activeStepIndex}
                isDisabled={index > activeStepIndex}
              />
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="bold"
                position="absolute"
                top="30px"
                width={{ base: "20vw", md: "unset" }}
                whiteSpace={{ base: "initial", md: "nowrap" }}
                textAlign="center"
                opacity={index > activeStepIndex ? 0.2 : 1}
                left={index === 0 ? (!borderBoxMode ? -4 : 0) : undefined}
                right={
                  index === lastStepIndex
                    ? !borderBoxMode
                      ? -5
                      : 0
                    : undefined
                }
                mx={{
                  base: index === lastStepIndex || index === 0 ? "20px" : "0px",
                  lg: "0px",
                }}
              >
                {step?.label}
              </Text>
            </Flex>
            {index !== lastStepIndex && (
              <Divider
                backgroundColor="primary.600"
                h="1px"
                opacity={index >= activeStepIndex ? 0.2 : 1}
              />
            )}
          </>
        ))}
      </Flex>
    </Box>
   </Center>
  );
};
export default ProgressStep;