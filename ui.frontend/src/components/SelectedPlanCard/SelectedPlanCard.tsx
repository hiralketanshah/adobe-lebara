import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SelectedPlanCardProps } from "./types";
import TopUpIcon from "../../icons/TopUpIcon";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import Button from "../Button/Button";

const SelectedPlanCard: React.FC<SelectedPlanCardProps> = ({
  planSummary,
  isExpanded,
  compact,
  selectedPlan,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const sharedTextStyle = {
    fontSize: compact ? "16px " : "32px",
    lineHeight: "1.1",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <Flex
      flexDirection="column"
      background="primary.800"
      p={compact ? "15px 18px 5px" : "30px 20px"}
      className={compact ? "compact" : "expanded"}
    >
      <Flex
        flexDirection={compact ? "row" : "column"}
        alignItems="flex-start"
        justifyContent={compact ? "space-between" : ""}
      >
        {!compact && (
          <Text
            color="lightenPrimary.500"
            fontSize="14px"
            lineHeight="2.3"
            fontWeight="bold"
            letterSpacing="0.01em"
          >
            {selectedPlan}
          </Text>
        )}
        <Flex flex={compact ? "row wrap" : "column"} marginBottom="10px">
          <Heading
            as="h3"
            {...sharedTextStyle}
            pr="6px"
            pl="2px"
            whiteSpace="pre-line"
          >
            {planSummary}
          </Heading>
        </Flex>
        <Button
          variant="ghost"
          color="secondary.500"
          padding={0}
          height="auto"
          fontSize={compact ? "12px" : "16px"}
          leftIcon={<TopUpIcon fill="secondary.500" />}
          rightIcon={<ChevronDownIcon fill="white" />}
          onClick={() => setExpanded(!expanded)}
          sx={{
            ".expanded  &": {
              ".chakra-button__icon:last-child": {
                display: "none",
              },
            },
            ".compact & ": {
              ".chakra-button__icon:first-child": {
                display: "none",
              },
              ".chakra-button__icon:last-child svg": {
                width: "10px",
                height: "10px",
              },
            },
          }}
        >
          {expanded ? "Hide Plan Details" : "View Plan Details"}
        </Button>
      </Flex>
      {expanded && (
        <Box mb={7} p="20px">
          <Text color="white">expanded content?</Text>
        </Box>
      )}
    </Flex>
  );
};

export default SelectedPlanCard;
