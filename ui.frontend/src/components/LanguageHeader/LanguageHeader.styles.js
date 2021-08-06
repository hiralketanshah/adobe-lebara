import styled from "styled-components";
import mediaquery from "../../mediaquery";
import { Box, Flex } from "@chakra-ui/react";

import lebaraColor from "../../color";

export const MenuWrapper = styled(Box)`
  display: flex;
  ${mediaquery.mobile`
    display:none;
    `}
`;

export const HeaderWrapper = styled(Flex)`
  ${mediaquery.mobile`
    height:49px;
    `}
`;
