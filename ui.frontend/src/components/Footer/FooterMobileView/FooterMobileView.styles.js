import styled from "styled-components";
import { Box, AccordionButton } from "@chakra-ui/react";
import mediaquery from "../../../mediaquery";

export const FooterMobileWrapper = styled(Box)`
  ${mediaquery.desktop`
    display: none;
  `}
  ${mediaquery.tablet`
    display: none;
`}
${mediaquery.desktopMax`
    display: none;
`}
`;
export const AccordionButtonWrapper = styled(AccordionButton)`
  &:focus {
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
`;
