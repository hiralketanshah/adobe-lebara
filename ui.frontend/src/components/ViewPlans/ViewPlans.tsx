import React from "react";
import { Divider } from "@chakra-ui/react";
import { PlanCardProps, PlanCardItem } from "./types";
import { getAllowanceDetails } from "./viewPlansUtil";
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
} from "./ViewPlans.styles";
import lebaraColor from "../../color";

const ViewPlans: React.FC<PlanCardProps> = ({
  offers,
  buttonLabel,
  minutesField,
  unlimitedTextField,
}) => {
  return (
    <>
      {offers?.map((offer: PlanCardItem) => (
        <PlanCardWrapper>
          <MobileLeftBox>
            <PlanWrap>
              <CurrencyText>£</CurrencyText>
              <MobilePriceWrap>{parseFloat(offer.cost) / 100}</MobilePriceWrap>
              <Duration> / {offer.validity}</Duration>
            </PlanWrap>
            <LebaraText>
              {getAllowanceDetails(offer.allowances, "Data")}{" "}
              {unlimitedTextField}
            </LebaraText>
          </MobileLeftBox>

          <LeftSideBox>
            <DataText>{getAllowanceDetails(offer.allowances, "Data")}</DataText>
            <DescriptionText>
              {getAllowanceDetails(offer.allowances, "UK_Plan_National")}
              {minutesField}
            </DescriptionText>
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
            <PriceText>€{parseFloat(offer.cost) / 100}</PriceText>
            <BuyPlanButton w="116px">{buttonLabel}</BuyPlanButton>
          </RightSideBox>
        </PlanCardWrapper>
      ))}
    </>
  );
};
export default ViewPlans;
