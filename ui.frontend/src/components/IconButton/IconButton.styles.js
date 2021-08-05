// .icon-button-wrapper {
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// }

// .icon-button-bottom-text {
//   margin-top: 8px;
// }

import styled from "styled-components";
import { Box, Text, Button } from "@chakra-ui/react";

export const IconButtonWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const IconButtonBottomText = styled(Text)`
  margin-top: 8px;
`;
