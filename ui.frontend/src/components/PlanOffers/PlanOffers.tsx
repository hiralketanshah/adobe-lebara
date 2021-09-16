// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { PlanOffersProps } from "./types";
import { ExpandablePlanCardProps } from "../ExpandablePlanCard/types";
import Link from "../Link/Link";
import ExpandablePlanCard from "../ExpandablePlanCard/ExpandablePlanCard";

import SideBubbleBG from "./Responsive_Homebackground_element.svg";

const PlanOffers: React.FC<PlanOffersProps> = ({
  offers,
  heading,
  title,
  subTitle,
  description,
  hideLabel,
  minutesField,
  unlimitedTextField,
  showLabel,
  ctaTopLink,
  ctaTopLabel,
  ctaBottomLink,
  ctaBottomLabel,
  buttonLabel,
}) => {
  const linkStyles = {
    fontSize: "14px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
  };
  const headingStyles = {
    fontSize: "22px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
    color: "lightenPrimary.600",
    lineHeight: "1.5",
  };
  const textStyles = {
    fontSize: "16px",
    lineHeight: "1.4",
  };

  const planOffers = useRef([]);

  const [planCardStatuses, setPlanCardStatuses] = React.useState<{
    [key: number]: boolean;
  }>(
    (offers || [])
      ?.map((_, index) => ({ [index]: false }))
      ?.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          ...currentValue,
        }),
        {}
      )
  );
  useEffect(() => {
    planOffers.current = offers?.map((offer, index) => ({
      ...offer,
      id: index,
    }));
    // eslint-disable-next-line
  }, []);
  const handleDetailsClick = (id: number, status: boolean) => {
    const result = { ...planCardStatuses };

    Object.keys(result).forEach((key) => {
      result[Number(key)] = false;
    });
    setPlanCardStatuses({
      ...result,
      [id]: status,
    });
  };
  return (
    <Box
      backgroundImage={SideBubbleBG}
      backgroundColor="lebaraBlue.50"
      backgroundPosition="center right"
      backgroundRepeat="no-repeat"
      py="50px"
      px="15px"
    >
      <Text
        color="lightenPrimary.600"
        as="h2"
        fontWeight="bold"
        fontSize={38}
        mb="40px"
      >
        {heading}
      </Text>
      <Flex flexDir="column" align="stretch">
        <Text as="h3" mb="10px" {...headingStyles}>
          {title}
        </Text>
        <Text mb="20px" fontWeight="bold" {...textStyles}>
          {subTitle}
        </Text>
        <Box d={{ md: "flex" }} justifyContent={{ md: "space-between" }}>
          <Text mb="10px" {...textStyles}>
            {description}
          </Text>
          <Link marginBottom="20px" {...linkStyles} href={ctaTopLink}>
            {ctaTopLabel}
          </Link>
        </Box>

        {planOffers.current &&
          planOffers.current?.map((plan: ExpandablePlanCardProps) => (
            <Box mt="20px" key={plan?.id}>
              <ExpandablePlanCard
                offer={plan}
                showLabel={showLabel}
                hideLabel={hideLabel}
                buttonLabel={buttonLabel}
                minutesField={minutesField}
                isExpanded={planCardStatuses[plan?.id]}
                id={plan?.id}
                contryList={plan?.contryList}
                unlimitedTextField={unlimitedTextField}
                allowanceList={plan?.allowanceList}
                onDetailsClick={handleDetailsClick}
              />
            </Box>
          ))}
        <Link
          textAlign="right"
          marginTop="30px"
          color="#FF3182"
          {...linkStyles}
          href={ctaBottomLink}
        >
          {ctaBottomLabel}
        </Link>
      </Flex>
    </Box>
  );
};

export default PlanOffers;
