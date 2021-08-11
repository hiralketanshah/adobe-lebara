import styled from "styled-components";
import { Box, Text, Link } from "@chakra-ui/react";
import mediaquery from "../../../mediaquery";

export const MenuWrapper = styled(Box)`
  display: flex;
  align-items: center;
  ${mediaquery.mobile`
    display:none;
  `}
`;

export const MenuText = styled(Text)`
  padding-right: 12px;
  color: white;
  font-size: 14px;
  text-transform: capitalize;
  line-height: 20px;
  font-weight: 200;
  ${mediaquery.tablet`
    font-size:12px;
  `}
`;
export const ChakraLink = styled.a`
  text-decoration: none;
`;
