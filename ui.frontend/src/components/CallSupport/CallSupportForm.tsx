import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import FormikTextArea from "../Formik/FormikTextArea/FormikTextArea";
import FormikSelect from "../Formik/FormikSelect/FormikSelect";
import { FormikSelectOption } from "../Formik/FormikSelect/types";
import { CallSupportProps } from "./types";

const CallSupportForm: React.FC<CallSupportProps> = ({
  heading,
  description,
  callbackMessageText,
  firstName,
  firstNameError,
  lastname,
  lastnameError,
  email,
  emailEmptyError,
  emailInvalidError,
  subject,
  subjectError,
  dropDownValues,
  helplabel,
  helpError,
  requestText,
  attachment,
  attachmentDescription,
  submitLabel,
  separatorText,
}) => {
  const initialValues: CallSupportProps = {
    firstName: "",
    lastname: "",
    email: "",
    subject: "",
    helpText: "",
  };
  const subjectOptions: FormikSelectOption[] = [
    { value: "Prepaid", name: "Prepaid" },
    { value: "Postpaid", name: "Postpaid" },
  ];
  const validate = (values: CallSupportProps) => {
    const errors: CallSupportProps = {
      firstName: "",
      email: "",
      helpText: "",
      subject: "",
    };
    const { email, firstName, helpText, subject } = values;
    if (!firstName) errors.firstName = firstNameError || "Please enter a valid first name";
    if (!helpText) errors.helpText = helpError || "Please explain how can we help";
    if (!subject) errors.subject = subjectError || "Please select a valid subject";
    if (!email) {
      errors.email = emailEmptyError || "Please enter a email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      if (!/^[0-9]+$/i.test(email))
        errors.email = emailInvalidError || "Please enter a valid email address";
    }
    return errors;
  };
  return (<Flex
    flexDirection="column"
    bg="lightenPrimary.50"
    alignItems="center"
    px={{ base: "24px", lg: "0px" }}
  >
    <Box
      px={{ base: "0px", lg: "56px" }}
      pt={{ base: "23px", lg: "83px" }}
      pb="32px"
      bg={{ base: "lightenPrimary.50", lg: "white" }}
      width={{ base: "100%", lg: "846px" }}
      mt={{ base: "0px", lg: "43px" }}
      borderRadius="8px"
      mb="9px"
    >
      <Flex
        alignItems={{ base: "flex-start", lg: "center" }}
        justifyContent={{ base: "flex-start", lg: "center" }}
        direction="column"
      >
        {heading && <Text
          fontFamily="Chiswick Grotesque Lebara"
          fontSize={{ base: "32px", lg: "47px" }}
          lineHeight={{ base: "40px", lg: "50px" }}
          fontWeight={{ base: "500", lg: "bold" }}
          color={{ base: "black", lg: "primary.500" }}
        >{heading}</Text>}

        {description && <Box
          width="100%"
          mt="24px"
          fontSize="14px"
          lineHeight="20px"
          letterSpacing="0.25px"
          textAlign={{base: 'left',  lg: 'center'}}
          className="rich-text"
          dangerouslySetInnerHTML={{ __html : description }}
        />}

        {separatorText && <Flex
          mt={{ base: "10px", lg: "35px" }}
          justifyContent="center"
          width="100%"
        >
          <Text
            fontWeight="500"
            fontSize="24px"
            lineHeight="28px"
            color="primary.500"
          >
            {separatorText}
          </Text>
        </Flex>}

        {callbackMessageText && <Text
          mt="7px"
          fontSize="16px"
          lineHeight="18px"
          display={{ base: "block", lg: "none" }}
        >
          {callbackMessageText}
        </Text>}

        <Box
          w={{ base: "100%", lg: "515px" }}
          mt="36px"
          borderRadius={{ base: "8px", lg: "none" }}
        >
          <Formik<CallSupportProps>
            validate={validate}
            initialValues={initialValues}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Flex flexDirection="column" gridGap="25px">
                  <FormikInput name="firstName" label={firstName} isRequired />
                  <FormikInput name="lastname" label={lastname} />
                  <FormikInput name="email" label={email} isRequired />
                  <FormikSelect
                    name="subject"
                    label={subject}
                    options={subjectOptions}
                    isRequired
                  />
                  <FormikTextArea
                    name="helpText"
                    label={helplabel}
                    placeholder="Max 300 Characters"
                    isRequired
                  />
                  {requestText && <Text
                    display={{ base: "none", lg: "block" }}
                    fontSize="14px"
                    lineHeight="20px"
                    letterSpacing="0.25px"
                  >
                    {requestText}
                  </Text>}
                  <Flex
                    justifyContent={{ base: "flex-start", lg: "center" }}
                    flexDir="column"
                    alignItems="center"
                  >
                    <Text
                      fontSize="16px"
                      lineHeight="22px"
                      letterSpacing="0.5px"
                      fontWeight="bold"
                    >
                      {attachment}
                    </Text>
                    {attachmentDescription && <Text
                      as="span"
                      bg="white"
                      mt="10px"
                      textAlign="center"
                      width={{ base: "100%", lg: "341px" }}
                      py="15px"
                      borderWidth="0.7px"
                      borderColor="greySuccess"
                      fontSize="14px"
                      lineHeight="20px"
                      letterSpacing="0.25px"
                      dangerouslySetInnerHTML={{ __html: attachmentDescription}}
                    />}
                  </Flex>
                  <Button
                    isFullWidth
                    type="submit"
                    mt={{ base: "33px", lg: "59px" }}
                    maxW={{ base: "100%", lg: "401px" }}
                    alignSelf="center"
                    isDisabled={Object.keys(errors).length > 0 || isSubmitting}
                  >
                    {submitLabel || "Submit"}
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  </Flex>
  );
};

export default CallSupportForm;
