import React from "react";
import { Divider, Flex, Text, Box } from "@chakra-ui/react";
import { ProgressStepProps } from "./types";
import ProgressStepEllipse from "../ProgressStepEllipse/ProgressStepEllipse";

const ProgressStep: React.FC<ProgressStepProps> = ({
  activeStepIndex,
  pageLinks,
}) => {
  const lastStepIndex = pageLinks?.length - 1;
  return (
    <Box py="30px" px="25px">
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
                bottom="-30px"
                opacity={index > activeStepIndex ? 0.2 : 1}
                left={index === 0 ? -4 : undefined}
                right={index === lastStepIndex ? -5 : undefined}
                whiteSpace="nowrap"
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
  );
};
export default ProgressStep;