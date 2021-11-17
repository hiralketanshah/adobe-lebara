import React from "react";
import { Box } from "@chakra-ui/react";
import { PostpaidPersonalDetailsProps } from "./types";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import PostpaidPersonalDetails from "./PostpaidPersonalDetails";

const PostpaidPersonalDetailsRoute: React.FC<PostpaidPersonalDetailsProps> = ({
  heading,
  ...rest
}) => (
  <SelectNumberAndOrderDetailsLayout>
    {heading && <Box py="43px">
      <PostpaidPersonalDetails heading={heading} {...rest} />
    </Box>}
  </SelectNumberAndOrderDetailsLayout>
);
export default PostpaidPersonalDetailsRoute;
