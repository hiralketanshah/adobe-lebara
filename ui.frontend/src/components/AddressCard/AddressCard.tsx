import React, { useState } from "react";
import { IoChevronForwardSharp } from "react-icons/all";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { AddressCardProps, AddressStatus } from "./types";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import FormikInput from "../Formik/FormikInput/FormikInput";
import FormikSelect from "../Formik/FormikSelect/FormikSelect";
import FormikAddressSearch from "../Formik/FormikAddressSearch/FormikAddressSearch";

const AddressCard: React.FC<AddressCardProps> = ({
  title,
  initialStatus = "Initial",
  searchAddressText,
  searchAddressSubText,
  currentAddress = "",
  addressesResult,
  value,
  setValue,
  padding,
  formikForm,
  onSetManual,
  addressLabel,
  streetLabel,
  streetPlaceholder,
  houseNumberLabel,
  houseNumberPlaceholder,
  zipCodeLabel,
  zipCodePlaceholder,
  cityLabel,
  postalcodePlaceholder,
  cityPlaceholder,
  cities,
  enterAddressManually,
  keyInAddress,
  saveAddress,
  country,
}) => {
  const [status, setStatus] = useState<AddressStatus>(initialStatus);

  const handleClick = () => {
    if (status === "Initial") {
      setStatus("SearchNewAddress");
    } else {
      if (onSetManual) {
        onSetManual();
      }
      setStatus("NewAddress");
    }
  };
  const initialBillingAddressBox = () => (
    <Flex
      px="11px"
      py="13px"
      backgroundColor="grey.50"
      mt="19px"
      dangerouslySetInnerHTML={
        currentAddress ? { __html: currentAddress } : undefined
      }
    />
  );
  const newAddress = () => (
    <Flex flexDirection="column">
      <FormLabel mb="5px" fontWeight="bold" fontSize="14px" lineHeight="22px">
        {addressLabel}
      </FormLabel>

      <Text color="explainerColor" fontSize="12px">
        {keyInAddress}
      </Text>
      <Flex flexDirection="column" mt="15px" gridGap="20px">
        <FormikInput
          name="streetName"
          isRequired
          label={streetLabel}
          placeholder={streetPlaceholder}
        />
        <FormikInput
          name="houseNumber"
          isRequired
          label={houseNumberLabel}
          placeholder={houseNumberPlaceholder}
        />
        <FormikInput
          name="zipCode"
          isRequired
          label={zipCodeLabel}
          placeholder={zipCodePlaceholder}
        />
        <FormikSelect
          name="townCity"
          isRequired
          options={cities}
          label={cityLabel}
          placeholder={cityPlaceholder}
        />
      </Flex>
    </Flex>
  );
  const searchBillingAddress = () => (
    <Flex flexDirection="column">
      <FormikAddressSearch
        name="address"
        label={addressLabel}
        placeholder={postalcodePlaceholder}
        isRequired
        country={country}
        postalCodeText={searchAddressSubText}
      />
    </Flex>
  );

  const searchResults = () => (
    <Flex flexDirection="column" mt="32px">
      <Text color="bodyCopy" fontSize={16} fontWeight="bold">
        Results ({addressesResult?.length})
      </Text>
      <Flex
        px="20px"
        py="19px"
        overflow="auto"
        maxHeight={360}
        backgroundColor="grey.100"
        mt="19px"
        flexDirection="column"
        gridGap={3}
      >
        {addressesResult?.map((address) => (
          <Button
            key={address}
            px="11px"
            py="13px"
            backgroundColor="white"
            borderRadius={10}
            w="100%"
            variant="ghost"
          >
            <Text fontWeight="bold" color="bodyCopy" fontSize={14}>
              {address}
            </Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
  const selectedSearchResult = () => (
    <Flex flexDirection="column" mt="32px">
      <Text color="bodyCopy" fontSize={16} fontWeight="bold">
        Results
      </Text>
      <Flex
        px="20px"
        py="19px"
        backgroundColor="grey.50"
        mt="19px"
        flexDirection="column"
        gridGap={3}
      >
        <Checkbox spacing={4}>{saveAddress}</Checkbox>
      </Flex>
    </Flex>
  );

  const buttonText = () => {
    if (status === "Initial") {
      return "CHANGE BILLING ADDRESS ?";
    }
    if (
      status === "SearchNewAddress" ||
      status === "SearchNewAddressWithResults" ||
      status === "SingleSearchResult"
    ) {
      return (
        <>
          <Text>{enterAddressManually} </Text>
          <IoChevronForwardSharp fontWeight="bold" />
        </>
      );
    }
    return undefined;
  };
  return (
    <Flex
      flexDirection="column"
      borderRadius={8}
      backgroundColor="white"
      px={padding ? 5 : 0}
      py={padding ? 6 : 0}
    >
      {status === "Initial" && initialBillingAddressBox()}
      {(status === "SearchNewAddress" ||
        status === "SearchNewAddressWithResults" ||
        status === "SingleSearchResult") &&
        searchBillingAddress()}
      {status === "NewAddress" && newAddress()}
      {status !== "NewAddress" && (
        <Button
          variant="ghost"
          color="secondary.500"
          mt="14px"
          onClick={handleClick}
        >
          {buttonText()}
        </Button>
      )}
      {status === "SearchNewAddressWithResults" && searchResults()}
      {status === "SingleSearchResult" && selectedSearchResult()}
    </Flex>
  );
};

export { AddressCard as default };
