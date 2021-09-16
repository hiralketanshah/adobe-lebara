import React from "react";
import { Box, Text } from "@chakra-ui/react";
import SocialMediaButtons from "../SocialMediaButtons/SocialMediaButtons";
import { FollowUSProps } from "./types";
import color from "../../../color";

const FollowUS: React.FC<FollowUSProps> = ({ followUsText, links }) => {
  return (
    <>
      <Box>
        <Box pt="50px" mt={{ lg: "initial", md: "2em" }}>
          <Text
            fontSize={14}
            color={color.lightenPrimary[500]}
            fontWeight="bold"
            textTransform="uppercase"
            pb="10px"
            pl="15px"
          >
            {followUsText}
          </Text>
          <Box width="350px">
            <SocialMediaButtons buttons={links} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FollowUS;
