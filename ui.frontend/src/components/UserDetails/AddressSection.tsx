import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FormikInput from "../Formik/FormikInput/FormikInput";

const AddressSection: React.FC<any> = () => {
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
      borderBottom="0.5px solid #c8c8c8"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <FormikInput
            name="streetName"
            isRequired
            label="Street Name"
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="houseNumber"
            isRequired
            label="House Number"
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="postCode"
            isRequired
            label="Post Code"
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="city"
            isRequired
            label="City"
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="alternateContactNumber"
            isRequired
            label="Alternative Contact Number"
            removeValidation
            {...disabledInputField}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AddressSection;
