import styled from "styled-components";
import mediaquery from "../../mediaquery";
import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import lebaraColor from "../../color";

export const DesktopGetApp = styled(Image)`
  ${mediaquery.mobile`
    display:none;
`}
`;
export const MobileGetApp = styled(Image)`
  ${mediaquery.desktopMax`
display:none;
`}
  ${mediaquery.tablet`
display:none;
`}
${mediaquery.desktop`
display:none;
`}
`;

export const DesktopGetAppHeading = styled(Heading)`
  ${mediaquery.mobile`
    display:none;
`}
`;
export const MobileGetAppHeading = styled(Heading)`
  ${mediaquery.desktopMax`
display:none;
`}
  ${mediaquery.tablet`
display:none;
`}
${mediaquery.desktop`
display:none;
`}
`;

export const DesktopWrapper = styled(Heading)`
  ${mediaquery.desktop`
    display:flex;
    align-items:center;
`}
`;
