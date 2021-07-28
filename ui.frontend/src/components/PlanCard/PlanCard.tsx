import React from "react";
import { Divider } from "@chakra-ui/react";
import { PlanCardProps } from "./types";

import {
  PlanCardWrapper,
  LeftSideBox,
  DataText,
  DescriptionText,
  RightSideBox,
  PriceText,
  BuyPlanButton,
  LebaraText,
  MobileLeftBox,
  PlanWrap,
  CurrencyText,
  MobilePriceWrap,
  Duration,
} from "./PlanCard.styles";
import lebaraColor from "../../color";

const PlanCard: React.FC<PlanCardProps> = ({
  price,
  duration,
  description,
  data,
}) => {
  return (
    <PlanCardWrapper>
      <MobileLeftBox>
        <PlanWrap>
          <CurrencyText>£</CurrencyText>
          <MobilePriceWrap>{price}</MobilePriceWrap>
          <Duration> / {duration}</Duration>
        </PlanWrap>
        <LebaraText>
          {data} {description}
        </LebaraText>
      </MobileLeftBox>

      <LeftSideBox>
        <DataText>{data}</DataText>
        <DescriptionText>{description}</DescriptionText>
      </LeftSideBox>

      <Divider
        my={3.5}
        orientation="vertical"
        borderWidth="0.5px"
        borderColor={lebaraColor.border}
        borderStyle="solid"
        h="50px"
        mr="19px"
      />

      <RightSideBox>
        <PriceText>€{price}</PriceText>
        <BuyPlanButton w="116px">Buy Plan</BuyPlanButton>
      </RightSideBox>
    </PlanCardWrapper>
  );
};
export default PlanCard;
PlanCard.defaultProps = {
  price: 10,
  duration: "7 Days",
  description: "+ Unlimited calls",
  data: "3GB",
  color: "red",
};
