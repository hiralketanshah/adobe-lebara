import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { PersonalDetailsFormProps } from "./types";

const PersonalDetailsRoute: React.FC<PersonalDetailsFormProps> = ({
  ...rest
}) => (
  <SelectNumberAndOrderDetailsLayout>
    <Box py="43px">
      <Text
        color="primary.500"
        fontSize={20}
        mt="20px"
        mb="15px"
        letterSpacing="-0.01em"
        fontWeight="bold"
        textAlign={{ lg: "left" }}
      >
        Your Personal Details
      </Text>
      <PersonalDetailsForm {...rest} />
    </Box>
  </SelectNumberAndOrderDetailsLayout>
);
export default PersonalDetailsRoute;
