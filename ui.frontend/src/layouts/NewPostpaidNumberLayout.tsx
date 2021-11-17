import React from "react";
import { Box } from "@chakra-ui/react";

const PostpaidNumberLayout: React.FC = ({ children }) => (
  <Box>
    <Box backgroundColor={{ base: "lightenPrimary.50", md: "white" }}>
      {children}
    </Box>
  </Box>
);

export default PostpaidNumberLayout;
