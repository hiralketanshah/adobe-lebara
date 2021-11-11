import React from "react";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/all";
import { ProgressBarCardProps } from "./types";
import Button from "../Button/Button";

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({
  buttonText,
  leftQuantity,
  planName,
  totalQuantity,
  validUpto,
  dataType,
  leftOfText,
  validToLabel,
}) => {
  const getProgressValue = () =>
    totalQuantity === 0 ? 100 : (leftQuantity * 100) / totalQuantity;
  const getProgressBarColor = () => {
    const progressValue = getProgressValue();
    let progressBarColor;
    if (progressValue >= 0 && progressValue <= 20) {
      progressBarColor = "red";
    } else if (progressValue > 20 && progressValue <= 40) {
      progressBarColor = "yellow";
    } else if (progressValue > 40 && progressValue <= 60) {
      progressBarColor = "blue";
    } else if (progressValue > 60) {
      progressBarColor = "green";
    }
    return progressBarColor;
  };
  return (
    <Flex
      flexDirection="column"
      background="white"
      borderRadius="lg"
      color="primary.600"
      py="15px"
    >
      {planName ? (
        <Box display="flex">
          <Text fontWeight="700" fontSize="14px" lineHeight="20px">
            {planName}
          </Text>
          &nbsp;
          <IoInformationCircleOutline size={18} color="secondary.500" />
        </Box>
      ) : (
        <></>
      )}
      <Box
        display="flex"
        color="primary.800"
        justifyContent="space-between"
        mt="14px"
      >
        <Flex direction="row">
          <Text fontWeight="500" fontSize="24px" lineHeight="30px">
            {leftQuantity}
          </Text>
          &nbsp;
          <Text fontWeight="400" fontSize="14px" lineHeight="20px" pt="5px">
            {leftOfText}
          </Text>
          &nbsp;
          <Text fontWeight="700" fontSize="14px" lineHeight="20px" pt="5px">
            {totalQuantity}
            {dataType}
          </Text>
        </Flex>
        {validUpto && (
          <Box fontSize="12px" lineHeight="17px" color="grey.300" pt="5px">
            <Flex>
              <Text>{validToLabel}</Text>
              &nbsp;
              <Text>{validUpto}</Text>
            </Flex>
          </Box>
        )}
      </Box>
      <Box
        mt="6px"
        borderWidth="1px"
        borderRadius="12px"
        p="3px"
        bgColor="grey.50"
      >
        <Progress
          value={getProgressValue()}
          size="xs"
          borderRadius="12px"
          colorScheme={getProgressBarColor()}
        />
      </Box>
      {buttonText ? (
        <Box textAlign="left">
          <Button
            mt="12px"
            fontSize="16px"
            lineHeight="25px"
            fontWeight="700"
            color="secondary.500"
            pl="15px"
            variant="ghost"
          >
            {buttonText}
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Flex>
  );
};
export default ProgressBarCard;
