import { Flex } from "@chakra-ui/layout";
import React from "react";

import SingleFormContainer from "../../layouts/SingleFormContainer";
import ChangePassword from "./ChangePassword";
import { ChangePasswordProps } from "./types";

const ChangePasswordContainer: React.FC<ChangePasswordProps> = ({ ...rest }) => {

  return (
    <SingleFormContainer hideButton noPadding>
       <Flex
          flexDirection="column"
          bg="lightenPrimary.50"
          justifyContent="center"
          alignItems="center"
          pb={{ base: "29px", lg: "100px" }}
          px={{ base: "20px" }}
        >
          <Flex
            pt={{ base: "37px", lg: "43px" }}
            pb="32px"
            bg="white"
            width={{ base: "100%", lg: "846px" }}
            mt={{ base: "27px", lg: "61px" }}
            borderRadius="8px"
            mb="9px"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >

          <ChangePassword {...rest} />
          </Flex>
      </Flex>
    </SingleFormContainer>
  );
};
export default ChangePasswordContainer;
