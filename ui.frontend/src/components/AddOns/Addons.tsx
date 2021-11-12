import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import IconButton from "../IconButton/IconButton";
import InfoIconOutline from "../../icons/InfoIconOutline";
import ProgressBarCard from "../ProgressBarCard/ProgressBarCard";
import { AddOnProps } from "./types";

const Addons: React.FC<AddOnProps> = ({
  title,
  planName,
  addMoreLabel,
  leftOfText,
  topUpLabel,
  leftQuantity,
  totalQuantity,
  validUpto,
  validToLabel,
  dataPackageUnit,
}) => (
  <Box
    width={{ base: "260px", md: "100%" }}
    padding="15px"
    borderRadius="12px"
    bgColor="white"
  >
    <Flex alignItems="baseline" width={{ base: "260px", md: "100%" }}>
      <Text
        color="primary.500"
        fontFamily="Roboto"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.1px"
      >{title}</Text>
      <IconButton
        h="7px"
        size="sm"
        aria-label="information"
        icon={<InfoIconOutline color="secondary.500" />}
      />
    </Flex>
    <Box marginTop="15px" width="100%">
      <ProgressBarCard
        planName={planName || "(plan name)"}
        leftOfText={leftOfText}
        buttonText={addMoreLabel}
        leftQuantity={leftQuantity}
        totalQuantity={totalQuantity}
        validUpto={validUpto}
        validToLabel={validToLabel}
        dataType={dataPackageUnit || "MB (Dyna)"}
      />
    </Box>
  </Box>
);

export default Addons;
