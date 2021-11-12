import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { PersonalDetailsFormProps } from "./types";

const PersonalDetailsRoute: React.FC<PersonalDetailsFormProps> = ({
  yourPersonalDetailsLabel,
  ...rest
}) => (
  <SelectNumberAndOrderDetailsLayout>
    <PersonalDetailsForm {...rest} heading={yourPersonalDetailsLabel} />
  </SelectNumberAndOrderDetailsLayout>
);
export default PersonalDetailsRoute;
