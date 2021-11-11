import React, { useState } from "react";
import { Flex, Box, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import {
  MdCheckCircle,
  HiOutlineExclamation,
  BsXCircleFill,
} from "react-icons/all";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import Input from "../Input/Input";
import AddressCard from "../AddressCard/AddressCard";
import { PersonalDetailsFormProps } from "./types";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import {
  ADDRESS_FIELD_PATTERN,
  EMAIL_FIELD_PATTERN,
  HOUSE_NUMBER_REGEX,
  NAME_FIELD_PATTERN,
  NUMBER_FIELD_PATTERN,
  STREET_REGEX,
  ZIP_CODE_REGEX,
} from "../../utils/lebara.constants";
import { globalConfigs, globalConstants } from "../../GlobalConfigs";
import { ReduxState } from "../../redux/types";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import VALIDATE_EMAIL_SPS from "../../graphql/VALIDATE_EMAIL_SPS";

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  heading,
  firstNameLabel,
  firstNamePlaceholder,
  firstNameErrorMax,
  firstNameErrorRequired,
  firstNameErrorPattern,
  orderDetailsCta,
  lastNameLabel,
  lastNamePlaceholder,
  lastNameErrorMax,
  lastNameErrorRequired,
  lastNameErrorPattern,
  emailAddressLabel,
  emailAddressPlaceholder,
  emailErrorMax,
  emailErrorRequired,
  emailErrorPattern,
  addressLabel,
  addressKeyInText,
  addressErrorRequired,
  streetLabel,
  streetPlaceholder,
  streetLabelErrorMax,
  streetLabelErrorRequired,
  streetLabelErrorPattern,
  houseNumberLabel,
  houseNumberPlaceholder,
  houseNumberErrorMax,
  houseNumberErrorRequired,
  houseNumberErrorPattern,
  zipCodeLabel,
  zipCodePlaceholder,
  zipCodeErrorMax,
  zipCodeErrorRequired,
  zipCodeErrorPattern,
  zipCodeErrorMin,
  cityLabel,
  postalcodePlaceholder,
  cityPlaceholder,
  cityErrorMax,
  cityErrorRequired,
  cities,
  enterAddressManually,
  keyInAddress,
  saveAddress,
}) => {
  const [firstNamePattern] = useState(NAME_FIELD_PATTERN);
  const [lastNamePattern] = useState(NAME_FIELD_PATTERN);
  const [emailIdPattern] = useState(EMAIL_FIELD_PATTERN);
  const [addressFieldPattern] = useState(ADDRESS_FIELD_PATTERN);
  const [numberPattern] = useState(NUMBER_FIELD_PATTERN);
  const history = useHistory();
  const [isManualAddress, setIsManualAddress] = useState(false);
  const location = useLocation<{
    bundlePlan: string;
    planDuration: string;
    toPortIn?: boolean;
  }>();
  const toPortIn = location?.state?.toPortIn;
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isFreeTopUpAndFreeSim = cartItems.every(
    (t) => t.isFreeSimTopup || t.isFreeSim
  );
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [validateEmailSps, { data: validateEmailSpsResult }] =
    useLazyQuery(VALIDATE_EMAIL_SPS);
  const validationSchema = (manualAddress: boolean) => {
    let scheme: any = {
      firstName: yup
        .string()
        .max(50, firstNameErrorMax)
        .required(firstNameErrorRequired)
        .matches(firstNamePattern, firstNameErrorPattern),
      lastName: yup
        .string()
        .max(75, lastNameErrorMax)
        .required(lastNameErrorRequired)
        .matches(lastNamePattern, lastNameErrorPattern),
      email: yup
        .string()
        .max(100, emailErrorMax)
        .required(emailErrorRequired)
        .matches(emailIdPattern, emailErrorPattern),
    };
    scheme = manualAddress
      ? {
          ...scheme,
          streetName: yup
            .string()
            .max(250, streetLabelErrorMax)
            .required(streetLabelErrorRequired)
            .matches(STREET_REGEX, streetLabelErrorPattern),
          houseNumber: yup
            .string()
            .max(20, houseNumberErrorMax)
            .required(houseNumberErrorRequired)
            .matches(HOUSE_NUMBER_REGEX, houseNumberErrorPattern),
          townCity: yup
            .string()
            .max(20, cityErrorMax)
            .required(cityErrorRequired),
          zipCode: yup
            .string()
            .max(10, zipCodeErrorMax)
            .min(5, zipCodeErrorMin)
            .required(zipCodeErrorRequired)
            .matches(ZIP_CODE_REGEX, zipCodeErrorPattern),
        }
      : {
          ...scheme,
          address: yup.object({
            label: yup.string().required(addressErrorRequired),
          }),
        };
    return yup.object(scheme);
  };
  const personalDetailsFormFormik: any = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      streetName: "",
      houseNumber: "",
      townCity: "",
      zipCode: "",
      addressCheckBox: false,
    },
    validationSchema: validationSchema(isManualAddress),
    onSubmit: () => {
      if (isManualAddress) {
        if (isFreeTopUpAndFreeSim) {
          setIsPaymentDialogOpen(true);
          return Promise.resolve();
        }

        history.push((globalConfigs.journeyPages[globalConstants.ORDER_DETAILS]  || '/'), {
          ...(location.state || {}),
          personalDetails: personalDetailsFormFormik.values,
        });
        return Promise.resolve();
      }
      return axios
        .get(
          `${globalConfigs.apiHostUri}/google/getAddress?placeId=${personalDetailsFormFormik.values.address.value.place_id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (isFreeTopUpAndFreeSim) {
            setIsPaymentDialogOpen(true);
            return;
          }
          history.push((globalConfigs.journeyPages[globalConstants.ORDER_DETAILS]  || '/'), {
            ...(location.state || {}),
            personalDetails: {
              ...personalDetailsFormFormik.values,
              streetName: res.data.address1,
              houseNumber: res.data.address2,
              townCity: res.data.city,
              addition: res.data.state,
              zipCode: res.data.postcode,
            },
          });
        });
    },
  });
  return (
    <form onSubmit={personalDetailsFormFormik.handleSubmit}>
      <Box p="20px 14px" background="white" borderRadius="lg">
        {heading && (
          <Text
            as="h3"
            color="primary.600"
            fontWeight="bold"
            fontSize={22}
            mb="10px"
            textAlign="center"
          >
            {heading}
          </Text>
        )}
        {/* First Name */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={firstNameLabel}
              id="firstName"
              mb="5px"
              isRequired
              onChange={personalDetailsFormFormik.handleChange}
              onBlur={personalDetailsFormFormik.handleBlur}
              value={personalDetailsFormFormik.values.firstName}
              isInvalid={
                personalDetailsFormFormik.touched.firstName &&
                Boolean(personalDetailsFormFormik.errors.firstName)
              }
              borderColor={
                personalDetailsFormFormik.touched.firstName &&
                Boolean(!personalDetailsFormFormik.errors.firstName)
                  ? "lebaraGreen"
                  : "greySilver"
              }
              errorBorderColor="unsuccessful"
              placeholder={firstNamePlaceholder}
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {personalDetailsFormFormik.touched.firstName &&
                Boolean(personalDetailsFormFormik.errors.firstName) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : personalDetailsFormFormik.touched.firstName &&
                  Boolean(!personalDetailsFormFormik.errors.firstName) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {personalDetailsFormFormik.touched.firstName &&
          personalDetailsFormFormik.errors.firstName ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {personalDetailsFormFormik.errors.firstName}
              </Text>
            </Box>
          ) : null}
        </Box>
        {/* Last Name */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={lastNameLabel}
              id="lastName"
              mb="5px"
              isRequired
              onChange={personalDetailsFormFormik.handleChange}
              onBlur={personalDetailsFormFormik.handleBlur}
              value={personalDetailsFormFormik.values.lastName}
              isInvalid={
                personalDetailsFormFormik.touched.lastName &&
                Boolean(personalDetailsFormFormik.errors.lastName)
              }
              borderColor={
                personalDetailsFormFormik.touched.lastName &&
                Boolean(!personalDetailsFormFormik.errors.lastName)
                  ? "lebaraGreen"
                  : "greySilver"
              }
              errorBorderColor="unsuccessful"
              placeholder={lastNamePlaceholder}
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {personalDetailsFormFormik.touched.lastName &&
                Boolean(personalDetailsFormFormik.errors.lastName) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : personalDetailsFormFormik.touched.lastName &&
                  Boolean(!personalDetailsFormFormik.errors.lastName) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {personalDetailsFormFormik.touched.lastName &&
          personalDetailsFormFormik.errors.lastName ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {personalDetailsFormFormik.errors.lastName}
              </Text>
            </Box>
          ) : null}
        </Box>

        {/* Email Address */}
        <Box mb="20px">
          <InputGroup>
            <Input
              label={emailAddressLabel}
              id="email"
              mb="5px"
              isRequired
              onChange={personalDetailsFormFormik.handleChange}
              onBlur={personalDetailsFormFormik.handleBlur}
              value={personalDetailsFormFormik.values.email}
              isInvalid={
                personalDetailsFormFormik.touched.email &&
                Boolean(personalDetailsFormFormik.errors.email)
              }
              borderColor={
                personalDetailsFormFormik.touched.email &&
                Boolean(!personalDetailsFormFormik.errors.email)
                  ? "lebaraGreen"
                  : "greySilver"
              }
              errorBorderColor="unsuccessful"
              placeholder={emailAddressPlaceholder}
            />
            <InputRightElement width="3rem" height="initial" top="2.6rem">
              <Box>
                {personalDetailsFormFormik.touched.email &&
                Boolean(personalDetailsFormFormik.errors.email) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : personalDetailsFormFormik.touched.email &&
                  Boolean(!personalDetailsFormFormik.errors.email) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {personalDetailsFormFormik.touched.email &&
          personalDetailsFormFormik.errors.email ? (
            <Box display="flex" alignItems="flex-start" pl="12px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {personalDetailsFormFormik.errors.email}
              </Text>
            </Box>
          ) : null}
        </Box>
        <AddressCard
          onSetManual={() => {
            setIsManualAddress(true);
            personalDetailsFormFormik.setFieldValue("address", undefined);
          }}
          formikForm={personalDetailsFormFormik}
          value={personalDetailsFormFormik.values.address}
          setValue={(value) =>
            personalDetailsFormFormik.setFieldValue("address", value)
          }
          title={addressLabel}
          initialStatus="SearchNewAddress"
          searchAddressSubText={addressKeyInText}
          streetLabel={streetLabel}
          streetPlaceholder={streetPlaceholder}
          houseNumberLabel={houseNumberLabel}
          houseNumberPlaceholder={houseNumberPlaceholder}
          zipCodeLabel={zipCodeLabel}
          zipCodePlaceholder={zipCodePlaceholder}
          cityLabel={cityLabel}
          postalcodePlaceholder={postalcodePlaceholder}
          cityPlaceholder={cityPlaceholder}
          cities={cities}
          enterAddressManually={enterAddressManually}
          keyInAddress={keyInAddress}
          saveAddress={saveAddress}
        />
        <Button
          isFullWidth
          mt="14px"
          mx="auto"
          d={{ lg: "block" }}
          type="submit"
          maxW={{ lg: "403px" }}
          disabled={
            !(
              personalDetailsFormFormik.isValid &&
              personalDetailsFormFormik.dirty
            )
          }
        >
          {isManualAddress && !isFreeTopUpAndFreeSim && !toPortIn
          ? "Continue to order details"
          : orderDetailsCta}
        </Button>
      </Box>
    </form>
  );
};

export default PersonalDetailsForm;
