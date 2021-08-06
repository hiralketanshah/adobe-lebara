import styled from "styled-components";
import mediaquery from "../../mediaquery";
import { Box, Text } from "@chakra-ui/react";
import Button from "../Button/Button";
import lebaraColor from "../../color";

export const PlanCardWrapper = styled(Box)`
  background: white;
  box-shadow: 8px 4px 15px 3px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  align-items: center;
  margin-bottom: 20px;
  height: 92px;
  display: flex;
  flex-direction: row;
  padding-inline: 2.5px;
  min-width: 330px;
`;

export const LeftSideBox = styled(Box)`
  display: flex;
  margin-left: 23px;
  align-items: start;
  flex-direction: column;
  ${mediaquery.mobile`
    display:none;
  `}
`;

export const DataText = styled(Text)`
  font-size: 30px;
  padding: 0px 4px 0px 2px;
  font-weight: bold;
  color: ${lebaraColor.fuschia[500]};
  ${mediaquery.tablet`
    font-size: 24px;
  `}
`;
export const DescriptionText = styled(Text)`
  color: ${lebaraColor.bodyCopy};
  font-size: 14px;
  font-weight: bold;
  ${mediaquery.tablet`
    width: 116px;
  `}
`;
export const RightSideBox = styled(Box)`
  display: flex;
  margin-right: 26px;
  align-items: center;
`;

export const PriceText = styled(Text)`
  font-size: 30px;
  padding-right: 4px;
  pedding-left: 2px;
  font-weight: bold;
  margin-right: 32px;
  color: ${lebaraColor.navy};
  ${mediaquery.tablet`
  font-size: 24px;
    margin-right: 20px;
  `}
  ${mediaquery.mobile`
    display:none;
  `}
  ${mediaquery.tablet`
  margin-right: 10px;
`}
`;

export const BuyPlanButton = styled(Button)`
  width: 134px;
  background: ${lebaraColor.lebaraChambray[500]};
  border-radius: 12px;
  border: 0px;
  color: ${lebaraColor.white};
  ${mediaquery.tablet`
    width: 105px;
    height: 40px;
  `}
`;

export const LebaraText = styled(Text)`
  color: ${lebaraColor.lebaraBlue[600]};
  font-size: 12px;
  font-weight: 200;
  line-height: 32px;
`;

export const MobileLeftBox = styled(Box)`
  margin-left: 18px;
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

export const PlanWrap = styled(Box)`
  display: flex;
  align-items: baseline;
`;

export const CurrencyText = styled(Text)`
  fontsize: 14px;
  alignitems: baseline;
  position: relative;
  font-weight: bold;
  top: -12px;
  color: ${lebaraColor.lebaraChambray[600]};
`;

export const MobilePriceWrap = styled(Text)`
  font-size: 30px;
  padding-right: 4px;
  pading-left: 2px;
  font-weight: bold;
  color: ${lebaraColor.lebaraChambray[600]};
`;
export const Duration = styled(Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${lebaraColor.lebaraChambray[600]};
`;
