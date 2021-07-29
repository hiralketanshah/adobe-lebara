import React from "react";
import { Divider } from "@chakra-ui/react";
import { PlanCardProps, PlanCardItem, Allowance, Account, Unit } from "./types";

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
  const AllowanceObj = (allowances: string, allowanceType: string) => {
    let allowancesArray = JSON.parse(allowances);

    let value;
    allowancesArray.forEach((allowance: Allowance) => {
      if (allowance.account.name == "Data" && allowanceType == "Data") {
        value =
          allowance.allowanceValue >= 1024
            ? allowance.allowanceValue / 1024 + "GB"
            : allowance.allowanceValue + "MB";
      } else if (
        allowance.account.name == "UK_Plan_National" &&
        allowanceType == "UK_Plan_National"
      ) {
        value = allowance.allowanceValue + " " + minutesField;
      }
    });
    return value;
  };
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
              {AllowanceObj(offer.allowances, "Data")} {unlimitedTextField}
            </LebaraText>
          </MobileLeftBox>

          <LeftSideBox>
            <DataText>{AllowanceObj(offer.allowances, "Data")}</DataText>
            <DescriptionText>
              {AllowanceObj(offer.allowances, "UK_Plan_National")}
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
