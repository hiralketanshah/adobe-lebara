import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FormikInput from "../Formik/FormikInput/FormikInput";

const UserNameAndSurnameSection: React.FC<any> = () => {
  const disabledInputField = {
    inputProps: {
      isDisabled: true,
    },
  };
  return (
    <Box
      bgColor="#F4F4F4"
      px={{ base: "13px", md: "42px" }}
      py={{ base: "21px", md: "41px" }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} pb="18px">
        <Box>
          <FormikInput
            name="userName"
            isRequired
            label="Name"
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="userSurname"
            isRequired
            label="Surname"
            removeValidation
            {...disabledInputField}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserNameAndSurnameSection;
