import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  BsXCircleFill,
  HiOutlineExclamation,
  IoChevronForwardSharp,
  MdCheckCircle,
} from "react-icons/all";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AddressCardProps, AddressStatus } from "./types";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";

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
      <Text fontSize={14} color="bodyCopy">
        Key in your address manually
      </Text>
      <Flex flexDirection="column" mt="15px" gridGap={2}>
        {/* Street */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={streetLabel}
              id="streetName"
              isRequired
              onChange={formikForm.handleChange}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.streetName}
              isInvalid={
                formikForm.touched.streetName &&
                Boolean(formikForm.errors.streetName)
              }
              borderColor={
                formikForm.touched.streetName &&
                Boolean(!formikForm.errors.streetName)
                  ? "lebaraGreen"
                  : "#C8C8C8"
              }
              placeholder={streetPlaceholder}
              errorBorderColor="unsuccessful"
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {formikForm.touched.streetName &&
                Boolean(formikForm.errors.streetName) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : formikForm.touched.streetName &&
                  Boolean(!formikForm.errors.streetName) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {formikForm.touched.streetName && formikForm.errors.streetName ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {formikForm.errors.streetName}
              </Text>
            </Box>
          ) : null}
        </Box>
        {/* House Number */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={houseNumberLabel}
              id="houseNumber"
              isRequired
              onChange={formikForm.handleChange}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.houseNumber}
              isInvalid={
                formikForm.touched.houseNumber &&
                Boolean(formikForm.errors.houseNumber)
              }
              borderColor={
                formikForm.touched.houseNumber &&
                Boolean(!formikForm.errors.houseNumber)
                  ? "lebaraGreen"
                  : "#C8C8C8"
              }
              errorBorderColor="unsuccessful"
              placeholder={houseNumberPlaceholder}
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {formikForm.touched.houseNumber &&
                Boolean(formikForm.errors.houseNumber) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : formikForm.touched.houseNumber &&
                  Boolean(!formikForm.errors.houseNumber) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {formikForm.touched.houseNumber && formikForm.errors.houseNumber ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {formikForm.errors.houseNumber}
              </Text>
            </Box>
          ) : null}
        </Box>
        {/* Zip Code */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={zipCodeLabel}
              id="zipCode"
              isRequired
              onChange={formikForm.handleChange}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.zipCode}
              isInvalid={
                formikForm.touched.zipCode && Boolean(formikForm.errors.zipCode)
              }
              borderColor={
                formikForm.touched.zipCode &&
                Boolean(!formikForm.errors.zipCode)
                  ? "lebaraGreen"
                  : "#C8C8C8"
              }
              errorBorderColor="unsuccessful"
              placeholder={zipCodePlaceholder}
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {formikForm.touched.zipCode &&
                Boolean(formikForm.errors.zipCode) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : formikForm.touched.zipCode &&
                  Boolean(!formikForm.errors.zipCode) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {formikForm.touched.zipCode && formikForm.errors.zipCode ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {formikForm.errors.zipCode}
              </Text>
            </Box>
          ) : null}
        </Box>
        {/* Town City */}
        <Box mb="20px">
          <InputGroup>
            <Select
              label={cityLabel}
              id="townCity"
              isRequired
              onChange={formikForm.handleChange}
              borderColor={
                formikForm.touched.townCity &&
                Boolean(!formikForm.errors.townCity)
                  ? "lebaraGreen"
                  : formikForm.touched.townCity &&
                    Boolean(formikForm.errors.townCity)
                  ? "#E1001E"
                  : "#C8C8C8"
              }
              boxShadow={formikForm.errors.townCity ? "0 0 0 1px #E1001E" : ""}
              placeholder={cityPlaceholder}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.townCity}
              options={cities}
            />
          </InputGroup>
          {formikForm.touched.townCity && formikForm.errors.townCity ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {formikForm.errors.townCity}
              </Text>
            </Box>
          ) : null}
        </Box>

        {/* <Checkbox
          mt="20px"
          id="addressCheckBox"
          spacing={4}
          onChange={formikForm.handleChange}
          onBlur={formikForm.handleBlur}
        >
          Save address for future
        </Checkbox> */}
      </Flex>
    </Flex>
  );
  const searchBillingAddress = () => (
    <Flex flexDirection="column">
      {searchAddressText && (
        <Text color="bodyCopy" fontSize={16} mb="20px">
          {searchAddressText}
        </Text>
      )}
      {searchAddressSubText && (
        <Text color="bodyCopy" fontSize={14} mb="20px">
          {searchAddressSubText}
        </Text>
      )}
      <GooglePlacesAutocomplete
        autocompletionRequest={{
          componentRestrictions: {
            country: ["de"],
          },
        }}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: postalcodePlaceholder,
        }}
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
        <Checkbox spacing={4}>Save address for future</Checkbox>
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
      {title && (
        <FormControl id="title" isRequired>
          <FormLabel fontWeight="bold" mb="7px" isRequired>
            {title}
          </FormLabel>
        </FormControl>
      )}
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
