import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { InfoBoxProps } from "./types";
import InfoIcon from "../../icons/InfoIcon";

const InfoBox: React.FC<InfoBoxProps> = ({ description, textProps }) => (
  <Flex>
    <Icon as={InfoIcon} fill="lightenPrimary.600" display="inline" mr="11px" />
    <Text color="bodyCopy" {...textProps}>
      {description}
    </Text>
  </Flex>
);

export default InfoBox;
