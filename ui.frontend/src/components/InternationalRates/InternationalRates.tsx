import React from "react";
import { Box, Select, Text, Image } from "@chakra-ui/react";
import { InternationalRatesProps, CountryList } from "./types";
import CallIcon from "../../assets/images/phone.png";
import MobileIcon from "../../assets/images/mobile.png";
import ChatIcon from "../../assets/images/bubble.png";

const InternationalRates: React.FC<InternationalRatesProps> = ({
  selectCountryLabel,
  countryLabel,
  description,
  landlineLabel,
  mobileLabel,
  smsLabel,
  landlineCallRate,
  mobileCallRate,
  smsRate,
  countryList,
}) => {
  const handleChange = (e: any) => {
    window.open(e.target.value);
  };
  return (
    <Box backgroundColor="lightCyan" padding="20px">
      <Box background="grey.50" padding="30px 60px">
        <Text as="label">{selectCountryLabel}</Text>
        <Select background="white" onChange={handleChange}>
          <option>{countryLabel}</option>
          {countryList?.map((country: CountryList, idx) => (
            <>
                {countryLabel !== country.label && (
                    <option value={country.value}>{country.label}</option>
                )}
            </>
          ))}
        </Select>
      </Box>
      <Text fontSize="16px" margin="15px 0">
        {description}
      </Text>
      <Box background="white" padding="10px">
        <Box
          padding="10px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderBottomColor="borderNwColor"
        >
          <Text display="flex">
            <Image src={CallIcon} alt="call icon" marginRight="15px" />
            {landlineLabel}
          </Text>
          <Text>{landlineCallRate}</Text>
        </Box>
        <Box
          padding="10px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderBottomColor="borderNwColor"
        >
          <Text display="flex" position="relative" left="7px">
            <Image src={MobileIcon} alt="call icon" marginRight="15px" />
            {mobileLabel}
          </Text>
          <Text>{mobileCallRate}</Text>
        </Box>
        <Box
          padding="10px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text display="flex">
            <Image src={ChatIcon} alt="call icon" marginRight="15px" />
            {smsLabel}
          </Text>
          <Text>{smsRate}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default InternationalRates;
