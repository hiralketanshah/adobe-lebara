import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Collapse,
  Flex,
  IconButton,
  Text,
  useBoolean, useToast,
} from "@chakra-ui/react";
import { BiMinusCircle, FaCamera, IoMdAddCircleOutline } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as yup from "yup";

import { globalConfigs as GC} from "@lebara/ui/src/configs/globalConfigs.js";
import { UserDetailsProps } from "./types";

import LebaraText from "../LebaraText/LebaraText";
import Button from "../Button/Button";
import UserNameAndSurnameSection from "./UserNameAndSurnameSection";
import AddressSection from "./AddressSection";
import EmailAndPasswordSection from "./EmailAndPasswordSection";
import { EMAIL_FIELD_PATTERN } from "../../utils/lebara.constants";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";
import UPDATE_MARKETING_PREFRENCES from "../../graphql/UPDATE_MARKETING_PREFRENCES";
import ChangeEmail from "./ChangeEmail";
import ChangeEmailSuccess from "./ChangeEmailSuccessMessage";

const UserDetails: React.FC<UserDetailsProps> = ({
  heading,
  description,
  sectionUsernameHeading,
  sectionAddressHeading,
  sectionEmailPasswordHeading,
  sectionConsentHeading,
  changeEmailHeading,
  frmFields,
  validationMessages,
  successEmailModal,
  settingsUpdatedLabel = "Your settings have been updated",
  alternateContactNumber,
  city,
  emailAddress,
  houseNumber,
  informedEmail,
  informedPhone,
  informedSms,
  password,
  postCode,
  selectedParterSms,
  selectedPartnerEmail,
  streetName,
  userName,
  userSurname,
  userInfo,
}) => {
  const history = useHistory();
  const [changeEmailSuccessPopup, setChangeEmailSuccessPopup] =
    React.useState(false);
  const [updatedEmail, setUpdatedEmail] = React.useState("");
  const [emailEditPopup, setEmailEditPopup] = React.useState(false);
  const [nameAndSurnameflag, setNameAndSurnameFlag] = useBoolean();
  const [addressSectionflag, setAddressSectionFlag] = useBoolean();
  const [emailPasswordSectionflag, setEmailPasswordSectionFlag] = useBoolean();
  const [consentManagementSectionflag, setConsentManagementSectionFlag] =
    useBoolean();
  const [updateMarketingPrefrences] = useMutation(UPDATE_MARKETING_PREFRENCES);
  const USER_PROFILE_CHANGE_PASSWORD= 'user-profile-change-password';
  const iconButtonProps = {
    variant: "ghost",
    colorScheme: "teal",
    fontSize: "20px",
  };

  const initialValues: UserDetailsProps = {
    userName,
    userSurname,
    streetName,
    houseNumber,
    postCode,
    city,
    alternateContactNumber,
    emailAddress,
    password,
    informedEmail,
    informedSms,
    informedPhone,
    selectedPartnerEmail,
    selectedParterSms,
  };
  const toast = useToast();
  const [lastFormValues, setLastFormValues] = React.useState(initialValues);
  const validationSchema = yup.object({
    emailAddress: yup
      .string()
      .required("Please enter a email address/mobile number")
      .matches(
        EMAIL_FIELD_PATTERN,
        "Please enter a valid email address/mobile number"
      ),
    password: yup.string().required("Please enter a password"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={
          emailPasswordSectionflag ? validationSchema : undefined
        }
        onSubmit={async (values, { setErrors }) => {
          try {
            await updateMarketingPrefrences({
              variables: {
                marketingPrefrences: {
                  contactViaSms: values.informedSms,
                  contactViaPhone: values.informedPhone,
                  contactViaEmail: values.informedEmail,
                },
              },
            });
            setLastFormValues(values);
            toast({
              title: settingsUpdatedLabel,
              status: "success",
              isClosable: true,
            });
          } catch (error: any) {
            if (error.graphQLErrors && error.graphQLErrors[0].message) {
              setErrors({ informedEmail: error.graphQLErrors[0].message });
            }
          }
        }}
      >
        {({ handleSubmit, handleReset, resetForm, isSubmitting }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Box px="20px" py="26px"
              w={{ base: "100%", lg: "846px" }}
              >
              {/* Heading Section */}
              <Box
                bgColor="white"
                color="black"
                borderRadius="lg"
                textAlign="left"
                px={{ base: "20px", md: "41px" }}
                py={{ base: "37px", md: "43px" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  {heading && <LebaraText type="h6" fontWeight="500" lineHeight="22px">
                    {heading}
                  </LebaraText>}
                  {description && <LebaraText mt="10px" type="body2" lineHeight="20px">
                    {description}
                  </LebaraText>}
                </Box>
                <Box display={{ base: "inline-block", md: "none" }}>
                  <Avatar
                    name={userInfo}
                    src={userInfo}
                    color="white"
                    size="lg"
                  >
                    <AvatarBadge
                      boxSize="1.25em"
                      bg="#CBEFFF"
                      borderColor="#CBEFFF"
                    >
                      <FaCamera size={15} color="black" />
                    </AvatarBadge>
                  </Avatar>
                </Box>
              </Box>
              {/* User Info */}
              <Box
                color="black"
                bgColor="white"
                borderRadius="lg"
                textAlign="left"
                mt="9px"
                pb="26px"
              >
                {/* Name And Surname Section */}
                <Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={{ base: "13px", md: "42px" }}
                    borderBottomWidth={!nameAndSurnameflag ? "0.5px" : "0px"}
                    borderColor="greySuccess"
                  >
                    <Box py={{ base: "21px", md: "41px" }}>
                      {sectionUsernameHeading && <LebaraText
                        type="subtitle1"
                        lineHeight="23px"
                        fontWeight="400"
                      >
                        {sectionUsernameHeading}
                      </LebaraText>}
                    </Box>
                    <IconButton
                      {...iconButtonProps}
                      aria-label="Toggle section"
                      onClick={setNameAndSurnameFlag.toggle}
                      mr={{ base: "10px", md: "55px" }}
                      icon={
                        !nameAndSurnameflag ? (
                          <IoMdAddCircleOutline size={24} color="#FF3182" />
                        ) : (
                          <BiMinusCircle size={24} color="#FF3182" />
                        )
                      }
                    />
                  </Box>
                  <Collapse in={nameAndSurnameflag} animateOpacity>
                    <UserNameAndSurnameSection frmFields={frmFields} />
                  </Collapse>
                </Box>

                {/* Address Section */}
                <Box mt={{ base: "none", md: "19px" }}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={{ base: "13px", md: "42px" }}
                    borderBottomWidth={!addressSectionflag ? "0.5px" : "0px"}
                    borderColor="greySuccess"
                  >
                    <Box
                      py={{ base: "21px", md: "41px" }}
                    >
                      {sectionAddressHeading && <LebaraText
                        type="subtitle1"
                        lineHeight="23px"
                        fontWeight="400"
                      >
                        {sectionAddressHeading}
                      </LebaraText>}
                    </Box>
                    <IconButton
                      {...iconButtonProps}
                      mr={{ base: "10px", md: "55px" }}
                      aria-label="Toggle section"
                      isRound
                      onClick={setAddressSectionFlag.toggle}
                      icon={
                        !addressSectionflag ? (
                          <IoMdAddCircleOutline size={24} color="#FF3182" />
                        ) : (
                          <BiMinusCircle size={24} color="#FF3182" />
                        )
                      }
                    />
                  </Box>
                  <Collapse in={addressSectionflag} animateOpacity>
                    <AddressSection frmFields={frmFields} />
                  </Collapse>
                </Box>

                {/* Email & Password Section */}
                <Box mt={{ base: "none", md: "19px" }}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={{ base: "13px", md: "42px" }}
                    borderBottomWidth={
                      !emailPasswordSectionflag ? "0.5px" : "0px"
                    }
                    borderColor="greySuccess"
                  >
                    <Box
                      py={{ base: "21px", md: "41px" }}
                    >
                      {sectionEmailPasswordHeading && <LebaraText
                        type="subtitle1"
                        lineHeight="23px"
                        fontWeight="400"
                      >
                        {sectionEmailPasswordHeading}
                      </LebaraText>}
                    </Box>
                    <IconButton
                      {...iconButtonProps}
                      aria-label="Toggle section"
                      isRound
                      mr={{ base: "10px", md: "55px" }}
                      onClick={setEmailPasswordSectionFlag.toggle}
                      icon={
                        !emailPasswordSectionflag ? (
                          <IoMdAddCircleOutline size={24} color="#FF3182" />
                        ) : (
                          <BiMinusCircle size={24} color="#FF3182" />
                        )
                      }
                    />
                  </Box>
                  <Collapse in={emailPasswordSectionflag} animateOpacity>
                    <EmailAndPasswordSection
                      frmFields={frmFields}
                      onEmailEdit={() => setEmailEditPopup(true)}
                      onPasswordEdit={() => {
                          history.push(GC.journeyPages[USER_PROFILE_CHANGE_PASSWORD] || '/user-profile/change-password');
                        }
                      }
                    />
                  </Collapse>
                </Box>
                {/* Consent Management */}
                <Box
                  mt={{ base: "none", md: "19px" }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={{ base: "13px", md: "42px" }}
                    borderBottomWidth={
                      !consentManagementSectionflag ? "0.5px" : "0px"
                    }
                    borderColor="greySuccess"
                  >
                    {sectionConsentHeading && <Box>
                      <LebaraText
                        type="subtitle1"
                        lineHeight="23px"
                        fontWeight="400"
                        py={{ base: "21px", md: "41px" }}
                      >
                        {sectionConsentHeading}
                      </LebaraText>
                    </Box>}
                    <IconButton
                      {...iconButtonProps}
                      aria-label="Toggle section"
                      isRound
                      mr={{ base: "10px", md: "55px" }}
                      onClick={setConsentManagementSectionFlag.toggle}
                      icon={
                        !consentManagementSectionflag ? (
                          <IoMdAddCircleOutline size={24} color="#FF3182" />
                        ) : (
                          <BiMinusCircle size={24} color="#FF3182" />
                        )
                      }
                    />
                  </Box>
                  <Collapse in={consentManagementSectionflag} animateOpacity>
                    <Box
                      bgColor="#F4F4F4"
                      px={{ base: "13px", md: "42px" }}
                      py={{ base: "21px", md: "41px" }}
                      borderBottom="0.5px solid #c8c8c8"
                    >
                      <Box>
                        {frmFields?.consentDescription && <LebaraText
                          type="caption"
                          fontWeight="500"
                          lineHeight="14px"
                          fontSize="12px"
                          dangerouslySetInnerHTML={{ __html: frmFields?.consentDescription }}
                        >
                        </LebaraText>}

                        {frmFields?.subscribeOptions?.length && <Flex flexDirection="row" mt="19px">
                          {frmFields?.subscribeOptions[0] && <FormikCheckbox name="informedEmail" isValidated>
                            <Text
                              color="black"
                              fontSize="14px"
                              lineHeight="16px"
                            >
                              {frmFields?.subscribeOptions[0].label}
                            </Text>
                          </FormikCheckbox>}
                          {frmFields?.subscribeOptions[1] && <Box ml="35px">
                            <FormikCheckbox name="informedSms" isValidated>
                              <Text
                                color="black"
                                fontSize="14px"
                                lineHeight="16px"
                              >
                                {frmFields?.subscribeOptions[1].label}
                              </Text>
                            </FormikCheckbox>
                          </Box>}
                          {frmFields?.subscribeOptions[2] && <Box ml="35px">
                            <FormikCheckbox name="informedPhone" isValidated>
                              <Text
                                color="black"
                                fontSize="14px"
                                lineHeight="16px"
                              >
                                {frmFields?.subscribeOptions[2].label}
                              </Text>
                            </FormikCheckbox>
                          </Box>}
                        </Flex>}
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
                
                {/* save / cancel */}
                <Box
                  pt="63px"
                  pb="41px"
                  px={{ base: "22px", md: "initial" }}
                  width={{ base: "full", md: "355px" }}
                  m={{ base: "initial", md: "0 auto" }}
                >
                  <Button
                    variant="solid"
                    color="white"
                    textTransform="uppercase"
                    fontSize="16px"
                    fontWeight="bold"
                    colorScheme="white"
                    isFullWidth
                    bgColor="primary.500"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {frmFields?.ctaButtonLabel}
                  </Button>
                  <Button
                    mt="15px"
                    variant="outline"
                    color="primary.500"
                    _hover={{ bgColor: "transparent" }}
                    fontSize="16px"
                    fontWeight="bold"
                    colorScheme="primary.500"
                    border="1px solid #3D4998"
                    isFullWidth
                    type="reset"
                    onClick={() => resetForm({ values: lastFormValues })}
                  >
                    {frmFields?.ctaCancelLabel}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      <ChangeEmail
        changeEmailHeading={changeEmailHeading || frmFields?.changeEmailHeading}
        frmFields={frmFields}
        validationMessages={validationMessages}
        isOpen={emailEditPopup}
        onClose={(status: boolean | undefined, email: string | undefined) => {
          setEmailEditPopup(false);
          setUpdatedEmail(email || "");
          if (status) {
            setChangeEmailSuccessPopup(true);
          }
        }}
      />
      <ChangeEmailSuccess
        successModal={successEmailModal}
        isOpen={changeEmailSuccessPopup}
        email={updatedEmail}
        onClose={() => setChangeEmailSuccessPopup(false)}
      />
    </>
  );
};
export default UserDetails;
