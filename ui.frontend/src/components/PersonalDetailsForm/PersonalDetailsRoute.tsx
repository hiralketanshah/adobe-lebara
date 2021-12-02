import React from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { PersonalDetailsFormProps } from "./types";
import { Box, Text } from "@chakra-ui/react";

const PersonalDetailsRoute: React.FC<PersonalDetailsFormProps> = ({
  yourPersonalDetailsLabel,
  ...rest
}) => (
  <SelectNumberAndOrderDetailsLayout>
       <Box
        pt={{ base: "30px", lg: "120px" }}
        pb={{ base: "30px", lg: "148px" }}
      >
        <Text
          d={{ lg: "none" }}
          color="primary.500"
          fontSize={20}
          py="15px"
          letterSpacing="-0.01em"
          fontWeight="bold"
          textAlign={{ lg: "left" }}
        >
          {yourPersonalDetailsLabel}
        </Text>
        <PersonalDetailsForm {...rest} heading={yourPersonalDetailsLabel}/>
      </Box>
  </SelectNumberAndOrderDetailsLayout>
);
export default PersonalDetailsRoute;
