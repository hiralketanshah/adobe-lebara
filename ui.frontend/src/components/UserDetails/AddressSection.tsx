import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FormikInput from "../Formik/FormikInput/FormikInput";
import { UserDetailsProps } from "./types";

const AddressSection: React.FC<UserDetailsProps> = ({
  frmFields
}) => {
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
            label={frmFields?.streetLabel}
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="houseNumber"
            isRequired
            label={frmFields?.houseNumberLabel}
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="postCode"
            isRequired
            label={frmFields?.zipCodeLabel}
            placeholder={frmFields?.zipCodePlaceholder}
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="city"
            isRequired
            label={frmFields?.cityLabel}
            placeholder={frmFields?.cityPlaceholder}
            removeValidation
            {...disabledInputField}
          />
        </Box>
        <Box>
          <FormikInput
            name="alternateContactNumber"
            isRequired
            label={frmFields?.alternativeContactLabel}
            placeholder={frmFields?.alternativeNumberPlaceholder}
            removeValidation
            {...disabledInputField}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AddressSection;
