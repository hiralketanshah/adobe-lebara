import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PostpaidPersonalDetailsProps } from "./types";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import PostpaidPersonalDetails from "./PostpaidPersonalDetails";

const PostpaidPersonalDetailsRoute: React.FC<PostpaidPersonalDetailsProps> = ({
  pageTitle,
  ...rest
}) => (
  <SelectNumberAndOrderDetailsLayout>
    {pageTitle && <Box py="43px">
      <Text
        color="primary.500"
        fontSize={20}
        mt="20px"
        mb="15px"
        letterSpacing="-0.01em"
        fontWeight="bold"
        textAlign={{ lg: "left" }}
      >
        {pageTitle}
      </Text>
      <PostpaidPersonalDetails {...rest} />
    </Box>}
  </SelectNumberAndOrderDetailsLayout>
);
export default PostpaidPersonalDetailsRoute;
