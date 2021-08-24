import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import mediaquery from "../../../mediaquery";

export const FooterWebViewWrapper = styled(Box)`
  ${mediaquery.mobile`
    display:none;
  `}
`;
