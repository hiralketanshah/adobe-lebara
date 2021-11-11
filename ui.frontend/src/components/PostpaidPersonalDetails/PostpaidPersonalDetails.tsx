import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormLabelProps,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLazyQuery } from "@apollo/client";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { PostpaidPersonalDetailsProps } from "./types";
import FormikInput from "../Formik/FormikInput/FormikInput";
import postpaidPersonalDetailsValidation from "./postpaidPersonalDetailsValidation";
import FormikAddressSearch from "../Formik/FormikAddressSearch/FormikAddressSearch";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";
import FormikRadioGroup from "../Formik/FormikRadioGroup/FormikRadioGroup";
import Button from "../Button/Button";
import FormikSelect from "../Formik/FormikSelect/FormikSelect";
import currentProviderList from "../../utils/currentProviderList";
import InfoBox from "../InfoBox/InfoBox";
import TextWithMoreButton from "../TextWithMoreButton/TextWithMoreButton";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import VALIDATE_EMAIL_SPS from "../../graphql/VALIDATE_EMAIL_SPS";

const dateLabelProps: FormLabelProps = {
  color: "explainerColor",
  marginBottom: "8px",
  fontSize: 12,
  fontWeight: "500",
};
const PostpaidPersonalDetails: React.FC<PostpaidPersonalDetailsProps> = () => {
  const history = useHistory();
  const [validateEmailSps, { data: validateEmailSpsResult }] =
    useLazyQuery(VALIDATE_EMAIL_SPS);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

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
        validate={postpaidPersonalDetailsValidation}
        onSubmit={(values) => {
          axios
            .get(
              `${GC.apiHostUri}/google/getAddress?placeId=${values.shippingAddress?.value.place_id}`,
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              history.push("/postpaid/details", {
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
        {({ handleSubmit, values, errors, dirty }) => {
          const isExistingUser = errors.email === "exists";
          const disabledInputProps = {
            inputProps: {
              isDisabled: isExistingUser,
            },
          };

          return (
            <Form onSubmit={handleSubmit}>
              <Heading
                lineHeight="40px"
                fontWeight="bold"
                fontSize={20}
                color="primary.500"
                my="7px"
                d={{ base: "block", lg: "none" }}
              >
                Enter Your Personal Details
              </Heading>

              <Flex
                pt={{ base: "19px", lg: "52px" }}
                pb={{ base: "28px", lg: "60px" }}
                px={{ base: "16px", lg: "150px" }}
                flexDirection="column"
                gridGap="20px"
                bg="white"
                borderRadius="8px"
              >
                <Heading
                  lineHeight="40px"
                  fontWeight="bold"
                  fontSize={20}
                  color="primary.500"
                  my="7px"
                  d={{ base: "none", lg: "block" }}
                >
                  Enter Your Personal Details
                </Heading>
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
                  label="Email Address"
                  placeholder="Email Address"
                  isRequired
                />
                <FormikInput
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  {...disabledInputProps}
                  isRequired
                />
                <FormikInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
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
                      Date of Birth
                    </FormLabel>
                  </FormControl>
                  <Flex gridGap="15px">
                    <FormikInput
                      name="day"
                      label="Day"
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1}
                    />
                    <FormikInput
                      name="month"
                      label="Month"
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1}
                    />
                    <FormikInput
                      name="year"
                      label="Year"
                      labelProps={dateLabelProps}
                      {...disabledInputProps}
                      flex={1.3}
                    />
                  </Flex>
                </Box>
                <FormikAddressSearch
                  name="shippingAddress"
                  label="Shipping Address"
                  placeholder="Search for postal code"
                  isRequired
                  isDisabled={isExistingUser}
                />
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
                    previewText="I consent to trustworthy cooperation partners of Lebara contacting me about their products and services for"
                  >
                    I consent to trustworthy cooperation partners of Lebara
                    contacting me about their products and services for
                    advertising purposes and for market research, via electronic
                    messages (e.g. e-mail, messenger and SMS) and telephone.
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
                Would you like to Port your Number?
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
                  Would you like to Port your Number?
                </Heading>

                <FormikRadioGroup
                  name="portInStatus"
                  options={[
                    {
                      label: "No, Thanks",
                      value: "No",
                    },
                    {
                      label: "I want to port in ",
                      value: "Yes",
                    },
                    {
                      label: "I want to use my Lebara Sim",
                      value: "ExistingPhone",
                    },
                  ]}
                />

                {values.portInStatus === "Yes" && (
                  <Flex my="29px" flexDirection="column" gridGap="22px">
                    <FormikInput
                      name="portInNumber"
                      label="Number to port"
                      placeholder="015100000000"
                      {...disabledInputProps}
                      isRequired
                    />
                    <FormikSelect
                      name="currentProvider"
                      helperText="Choose your current provider from the list provided."
                      label="Current Provider"
                      placeholder="Select an option"
                      isRequired
                      options={currentProviderList}
                      isDisabled={isExistingUser}
                    />
                    <Flex flexDirection="column" gridGap="14px">
                      <InfoBox
                        description={
                          <>
                            Please remember to inform your previous provider
                            before ordering that you would like to take the
                            number with you to Lebara. You can find details on
                            porting{" "}
                            <Link color="secondary.500" href="/">
                              here
                            </Link>
                            .
                          </>
                        }
                        textProps={{
                          fontSize: "12px",
                          color: "black",
                        }}
                      />
                      <FormikCheckbox name="isUsageProfileAccepted">
                        <Text fontSize={12} ml="11px" lineHeight="17.1px">
                          The number portability should only take place after my
                          current contract has ended. In the case of a prepaid
                          tariff, please do not select, as the porting takes
                          place immediately.
                        </Text>
                      </FormikCheckbox>
                      <FormikCheckbox name="isAdvertisingAccepted">
                        <TextWithMoreButton
                          fontSize={12}
                          ml="11px"
                          lineHeight="17.1px"
                          previewText="I would like to take my existing mobile number with me to Lebara (number portability) and instruct Lebara to port my number as soon as possible"
                        >
                          I would like to take my existing mobile number with me
                          to Lebara (number portability) and instruct Lebara to
                          port my number as soon as possible. I am aware that
                          the number portability can only take place if the
                          mobile phone number, the spelling of my name and my
                          date of birth as stated above, correspond to my
                          customer data with my previous provider. Number
                          portability may not be possible if there is any
                          discrepancy. I am aware that my existing contract with
                          my previous provider remains unaffected by the number
                          portability. If I wish to terminate my contract with
                          my previous provider, I will terminate it myself. I am
                          also aware that my previous provider can charge me for
                          number portability. In the case of a prepaid card,
                          there must be sufficient credit remaining with my
                          previous provider to cover the number portability
                          costs.
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
                      In order to be able to port in your Lebara prepaid number,
                      please first
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
                          history.push("/register");
                        }}
                      >
                        Create an account
                      </Button>
                      <Text
                        textAlign="center"
                        fontSize="12px"
                        lineHeight="17.1px"
                      >
                        or
                      </Text>
                      <Button
                        w={{ base: "100%", lg: "316px" }}
                        onClick={() => history.push("/login")}
                      >
                        Login
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
                    Continue
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
                  Continue
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
