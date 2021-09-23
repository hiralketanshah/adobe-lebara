import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { NeedHelpFooterProps } from "./types";
import Link from "../Link/Link";

const NeedHelpFooter: React.FC<NeedHelpFooterProps> = () => (
  <Box p={15} bg="lebaraChambray.800" color="white">
    <Box>
      <Text fontSize={20}>Need Help?</Text>
      <Text pt="6px">
        Look into our <Link href="http://google.com">Customer Support</Link>
      </Text>
    </Box>
  </Box>
);

export default NeedHelpFooter;
