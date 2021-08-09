import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import mediaquery from "../../mediaquery";
import lebaraColor from "../../color";

export const HeaderWrapper = styled(Box)`
  background: ${lebaraColor.lebaraBlue[500]};
  height: 70px;
  display: flex;
  align-items: center;
`;

export const MenuWrapper = styled(Box)`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 30px;
  padding-left: 30px;
`;
