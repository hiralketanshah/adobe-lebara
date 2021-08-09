import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import lebaraColor from "../../color";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import mediaquery from "../../mediaquery";

export const HeaderWrapper = styled(Box)`
  background: ${lebaraColor.lebaraBlue[500]};
  height: 70px;
  display: flex;
  align-items: center;
  ${mediaquery.mobile`
    height: 40px;
`}
  ${mediaquery.tablet`
    height: 63px;
`}
`;

export const MenuWrapper = styled(Box)`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  width: 85%;
  justify-content: space-between;
  ${mediaquery.mobile`
    justify-content: flex-end;
  `}

  ${mediaquery.tablet`
    padding-right: 6px;
    padding-left: 6px;
    width: 100%;
  `}
`;

export const ButtonWrapper = styled(Button)`
  background: ${lebaraColor.lebaraChambray[500]};
  border-radius: 12px;
  color: white;
  ${mediaquery.mobile`
    display:none;
`}
`;

export const IconWrapper = styled(IconButton)`
  margin-left: 4px;
`;

export const IconContainer = styled(Box)`
  ${mediaquery.desktop`
    display:none;
  `}
  ${mediaquery.desktopMax`
    display:none;
  `}
  ${mediaquery.tablet`
    display:none;
  `}
`;

export const HeaderButtonWrapper = styled(Box)`
  display: flex;
  ${mediaquery.mobile`
    display:none;
`}
`;
