import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormLabelProps,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLazyQuery } from "@apollo/client";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { PostpaidDetails, PostpaidPersonalDetailsProps } from "./types";
import FormikInput from "../Formik/FormikInput/FormikInput";
import postpaidPersonalDetailsValidation from "./postpaidPersonalDetailsValidation";
import FormikAddressSearch from "../Formik/FormikAddressSearch/FormikAddressSearch";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";
import FormikRadioGroup from "../Formik/FormikRadioGroup/FormikRadioGroup";
import Button from "../Button/Button";
import FormikSelect from "../Formik/FormikSelect/FormikSelect";
import InfoBox from "../InfoBox/InfoBox";
import TextWithMoreButton from "../TextWithMoreButton/TextWithMoreButton";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import VALIDATE_EMAIL_SPS from "../../graphql/VALIDATE_EMAIL_SPS";
// import AddressCard from "../AddressCard/AddressCard";

const dateLabelProps: FormLabelProps = {
  color: "explainerColor",
  marginBottom: "8px",
  fontSize: 12,
  fontWeight: "500",
};
const PostpaidPersonalDetails: React.FC<PostpaidPersonalDetailsProps> = ({
  heading,
  portingSectionHeading,
  validationMessages,
  frmFields,
}) => {
  const history = useHistory();
  const [validateEmailSps, { data: validateEmailSpsResult }] = useLazyQuery(VALIDATE_EMAIL_SPS);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  // const [isManualAddress, setIsManualAddress] = useState(false);

  const dynamicFormikValidate = (values: any) => postpaidPersonalDetailsValidation(values, validationMessages);

  return (
    <>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
      />
      <Formik
        initialValues={{
          portInStatus: "No",
        }}
        validate={(values) => dynamicFormikValidate(values)}
        onSubmit={(values:PostpaidDetails) => {
          axios
            .get(
              `${GC.apiHostUri}/google/getAddress?placeId=${values.shippingAddress?.value.place_id}`,
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              history.push((GC.journeyPages[C.POSTPAID_DETAILS]  || '/'), {
                personalDetails: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  streetName: res.data.address1,
                  houseNumber: res.data.address2,
                  townCity: res.data.city,
                  addition: res.data.state,
                  zipCode: res.data.postcode,
                  addressLabel: values.shippingAddress?.label,
                },

                portIn: {
                  dob: `${values.month}/${values.day}/${values.year}`,
                  msisdn: values.portInNumber,
                  previousProvider: values.currentProvider,
                },
              });

              setIsPaymentDialogOpen(true);
            });
        }}
      >
        {({ handleSubmit, values, errors, dirty, touched }) => {
          const isExistingUser = errors.email === "exists";
          const disabledInputProps = {
            inputProps: {
              isDisabled: isExistingUser,
            },
          };

          return (
            <Form onSubmit={handleSubmit}>
              {heading && (<Heading
                  lineHeight="40px"
                  fontWeight="bold"
                  fontSize={20}
                  color="primary.500"
                  my="7px"
                  d={{ base: "block", lg: "none" }}
                >{heading}
              </Heading>)}
              
              <Flex
                pt={{ base: "19px", lg: "52px" }}
                pb={{ base: "28px", lg: "60px" }}
                px={{ base: "16px", lg: "150px" }}
                flexDirection="column"
                gridGap="20px"
                bg="white"
                borderRadius="8px"
              >
                {heading && (<Heading
                  lineHeight="40px"
                  fontWeight="bold"
                  fontSize={20}
                  color="primary.500"
                  my="7px"
                  d={{ base: "none", lg: "block" }}
                >
                  {heading}
                </Heading>)}
                <FormikInput
                  validate={async (email) => {
                    await validateEmailSps({
                      variables: {
                        email,
                      },
                    });
                    if (
                      validateEmailSpsResult?.validateEmailSPS?.startsWith(
                        "Customer already exists"
                      )
                    ) {
                      return "exists";
                    }
                    return undefined;
                  }}
                  name="email"
                  label={frmFields.emailLabel}
                  placeholder={frmFields.emailPlaceholder}
                  isRequired
                />
                <FormikInput
                  name="firstName"
                  label={frmFields.fNameLabel}
                  placeholder={frmFields.fnamePlaceholder}
                  {...disabledInputProps}
                  isRequired
                />
                <FormikInput
                  name="lastName"
                  label={frmFields.lNameLabel}
                  placeholder={frmFields.lNamePlaceholder}
                  {...disabledInputProps}
                  isRequired
                />

                <Box>
                  <FormControl isRequired>
                    <FormLabel
                      htmlFor="day"
                      mb="16px"
                      fontWeight="bold"
                      fontSize="14px"
                      lineHeight="22px"
                    >
                      {frmFields.dobLabel}
                    </FormLabel>
                  </FormControl>
                  <Flex gridGap="15px">
                    <FormikInput
                      name="day"
                      label={frmFields.dayLabel}
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1}
                    />
                    <FormikInput
                      name="month"
                      label={frmFields.monthLabel}
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1}
                    />
                    <FormikInput
                      name="year"
                      label={frmFields.yearLabel}
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1.3}
                    />
                  </Flex>
                </Box>
                <FormikAddressSearch
                  name="shippingAddress"
                  label={frmFields.shippingLabel}
                  placeholder={frmFields.shippingPlaceholder}
                  isRequired
                  isDisabled={isExistingUser}
                  country={GC.country}
                />
                {/* <AddressCard
                  onSetManual={() => {
                    setIsManualAddress(true);
                  }}
                  
                  addressLabel={frmFields.shippingLabel}
                  initialStatus="SearchNewAddress"
                  searchAddressSubText={frmFields.addressKeyInText}
                  streetLabel={frmFields.streetLabel}
                  streetPlaceholder={frmFields.streetPlaceholder}
                  houseNumberLabel={frmFields.houseNumberLabel}
                  houseNumberPlaceholder={frmFields.houseNumberPlaceholder}
                  zipCodeLabel={frmFields.zipCodeLabel}
                  zipCodePlaceholder={frmFields.zipCodePlaceholder}
                  cityLabel={frmFields.cityLabel}
                  postalcodePlaceholder={frmFields.postalcodePlaceholder}
                  cityPlaceholder={frmFields.cityPlaceholder}
                  cities={frmFields.cities}
                  enterAddressManually={frmFields.enterAddressManually}
                  saveAddress={frmFields.saveAddress}
                  keyInAddress={frmFields.keyInAddress}
                  postalCodeText={frmFields.addressKeyInText}
                  country={GC.country}
                /> */}
              </Flex>

              <Flex
                px={{ base: "16px", lg: "150px" }}
                py={{ base: "16px", lg: "56px" }}
                flexDirection="column"
                bg="white"
                gridGap="12px"
                borderRadius="8px"
                mt="16px"
                mb="20px"
              >
                <FormikCheckbox name="isAdvertisingAccepted">
                  <TextWithMoreButton
                    fontSize={12}
                    ml="11px"
                    lineHeight="17.1px"
                    previewText={frmFields.consentPreviewText}
                  >
                    <span 
                        dangerouslySetInnerHTML={{ __html: 
                          frmFields && frmFields.consentDescription ? 
                          frmFields.consentDescription : '' }} 
                      />
                  </TextWithMoreButton>
                </FormikCheckbox>
              </Flex>

              <Heading
                lineHeight="40px"
                fontWeight="bold"
                fontSize={20}
                color="primary.500"
                mb="14px"
                d={{ base: "block", lg: "none" }}
              >
                {portingSectionHeading}
              </Heading>

              <Flex
                px={{ base: "16px", lg: "150px" }}
                py={{ base: "16px", lg: "47px" }}
                flexDirection="column"
                bg="white"
                gridGap="12px"
                borderRadius="8px"
              >
                <Heading
                  lineHeight="40px"
                  fontWeight="bold"
                  fontSize={20}
                  color="primary.500"
                  mb="14px"
                  d={{ base: "none", lg: "block" }}
                >
                  {frmFields.portInNumberLabel}
                </Heading>

                <FormikRadioGroup
                  name="portInStatus"
                  options={frmFields.portInOptions}
                />

                {values.portInStatus === "Yes" && (
                  <Flex my="29px" flexDirection="column" gridGap="22px">
                    <FormikInput
                      name="portInNumber"
                      label={frmFields.portInNumberLabel}
                      placeholder={frmFields.portInNumberPlaceHolder}
                      {...disabledInputProps}
                      isRequired
                    />
                    <FormikSelect
                      name="currentProvider"
                      helperText={frmFields.currentProviderHelperText}
                      label={frmFields.currentProviderLabel}
                      placeholder={frmFields.currentProviderPlaceholder}
                      isRequired
                      options={frmFields.currentProviderList}
                      isDisabled={isExistingUser}
                    />
                    <Flex flexDirection="column" gridGap="14px">
                      <InfoBox
                        description={<>
                          <div 
                            dangerouslySetInnerHTML={{ __html: 
                              frmFields && frmFields.currentProviderInfoDescription ? 
                              frmFields.currentProviderInfoDescription : '' }} 
                          />
                        </>}
                        textProps={{
                          fontSize: "12px",
                          color: "black",
                        }}
                      />
                      <FormikCheckbox name="isUsageProfileAccepted">
                        <Text fontSize={12} ml="11px" lineHeight="17.1px"
                         dangerouslySetInnerHTML={{ __html: 
                          frmFields && frmFields.currentProviderUsageAcceptanceLabel ? 
                          frmFields.currentProviderUsageAcceptanceLabel : '' }} 
                          >
                        </Text>
                      </FormikCheckbox>
                      <FormikCheckbox name="isAdvertisingAccepted">
                        <TextWithMoreButton
                          fontSize={12}
                          ml="11px"
                          lineHeight="17.1px"
                          previewText=
                          {frmFields.currentProviderAdvertisingPreviewText}
                        >
                          <span 
                            dangerouslySetInnerHTML={{ __html: 
                              frmFields && frmFields.currentProviderAdvertisingAcceptanceLabel ? 
                              frmFields.currentProviderAdvertisingAcceptanceLabel : '' }} 
                          />
                        </TextWithMoreButton>
                      </FormikCheckbox>
                    </Flex>
                  </Flex>
                )}
                {values.portInStatus === "ExistingPhone" && (
                  <Flex my="20px" flexDirection="column" gridGap="20px">
                    <Text
                      fontSize={12}
                      lineHeight="17px"
                      letterSpacing="0.23px"
                      color="black"
                    >
                      {frmFields.exitingPhoneHelperLabel}
                    </Text>
                    <Flex
                      flexDirection="column"
                      gridGap="14px"
                      alignItems="center"
                    >
                      <Button
                        variant="outline"
                        w={{ base: "100%", lg: "316px" }}
                        onClick={() => {
                          history.push(GC.journeyPages[C.REGISTER]  || '/');
                        }}
                      >
                        {frmFields.linkCTALabel}
                      </Button>
                      <Text
                        textAlign="center"
                        fontSize="12px"
                        lineHeight="17.1px"
                      >
                        {frmFields.orTextLabel}
                      </Text>
                      <Button
                        w={{ base: "100%", lg: "316px" }}
                        onClick={() => history.push(GC.journeyPages[C.LOGIN]  || '/')}
                      >
                        {frmFields.buttonCTALabel}
                      </Button>
                    </Flex>
                  </Flex>
                )}
                {values.portInStatus !== "ExistingPhone" && (
                  <Button
                    alignSelf="center"
                    d={{ base: "none", lg: "block" }}
                    mt="20px"
                    w="316px"
                    type="submit"
                    isDisabled={Object.keys(errors).length > 0 || !dirty}
                  >
                    {frmFields.ctaContinueLabel}
                  </Button>
                )}
              </Flex>
              {values.portInStatus !== "ExistingPhone" && (
                <Button
                  d={{ base: "block", lg: "none" }}
                  mt="20px"
                  isFullWidth
                  type="submit"
                  isDisabled={Object.keys(errors).length > 0 || !dirty}
                >
                  {frmFields.ctaContinueLabel}
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PostpaidPersonalDetails;
