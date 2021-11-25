import React from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/all";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Button from "../Button/Button";
import LebaraText from "../LebaraText/LebaraText";
import { ChangeEmailPasswordProfileProps } from "./types";

const EmailAndPasswordSection: React.FC<ChangeEmailPasswordProfileProps> = ({
  onEmailEdit,
  onPasswordEdit,
}) => {
  const [emailFieldDisabled] = React.useState(true);
  const [passwordFieldDisabled] = React.useState(true);
  const disabledEmailProps = {
    inputProps: {
      isDisabled: emailFieldDisabled,
      color: "#3D4998",
      fontSize: "12px",
      textDecoration: "underline",
      fontWeight: "500",
    },
  };
  const disabledPasswordProps = {
    inputProps: {
      isDisabled: passwordFieldDisabled,
      color: "#3D4998",
      type: "password",
    },
    isDisabled: true,
  };
  return (
    <Box
      bgColor="#F4F4F4"
      px={{ base: "13px", md: "42px" }}
      py={{ base: "21px", md: "41px" }}
      borderBottom="0.5px solid #c8c8c8"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <InputGroup size="md">
            <FormikInput
              name="emailAddress"
              isRequired
              label="Email Address"
              removeValidation
              {...disabledEmailProps}
            />
            <InputRightElement width="4.5rem" mt="30px">
              <Button
                padding="initial"
                bgColor="transparent"
                color="#463C3C"
                _hover={{ bgColor: "transparent" }}
                onClick={onEmailEdit}
              >
                <FiEdit size={24} color="#463C3C" />
                &nbsp;
                <LebaraText type="button" color="#FF3182">
                  Edit
                </LebaraText>
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <InputGroup size="md">
            <FormikInput
              name="password"
              isRequired
              label="Password"
              removeValidation
              {...disabledPasswordProps}
            />
            <InputRightElement width="4.5rem" mt="30px">
              <Button
                padding="initial"
                bgColor="transparent"
                color="#463C3C"
                _hover={{ bgColor: "transparent" }}
                onClick={onPasswordEdit}
              >
                <FiEdit size={24} color="#463C3C" />
                &nbsp;
                <LebaraText type="button" color="#FF3182">
                  Edit
                </LebaraText>
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default EmailAndPasswordSection;
