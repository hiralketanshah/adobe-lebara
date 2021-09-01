import React from "react";
import { Flex } from "@chakra-ui/react";
import { CountryWithFlagProps } from "./types";
import Title from "../Title/Title";

const CountryWithFlag: React.FC<CountryWithFlagProps> = ({
  countryName,
  countryFlag,
  countryCode,
}) => (
  <Flex alignItems="center" gridGap={2} fontSize={12}>
    <img src={countryFlag} alt={countryCode} height="11" width="16" />
    <Title type="caption">{countryName}</Title>
  </Flex>
);

export default CountryWithFlag;
