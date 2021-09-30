// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { PlanOffersProps } from "./types";
import Link from "../Link/Link";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import TickInCircle from "../../icons/TickInCircle";

const PlanOffers: React.FC<PlanOffersProps> = ({
  offers,
  heading,
  title,
  subTitle,
  description,
  showLabel,
  ctaTopLink,
  ctaTopLabel,
  ctaBottomLabel,
  buttonLabel
}) => {
  const history = useHistory();
  const linkStyles = {
    fontSize: "14px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
    color: "var(--chakra-colors-pink-500);"
  };

  return (
    <Box
      backgroundColor="lightenPrimary.50"
      backgroundPosition="center right"
      backgroundRepeat="no-repeat"
      py={{ base: "30.68px", lg: "60px" }}
      px={{ base: "20px", lg: "80px" }}
    >
      {heading && (
        <Text
          color="primary.600"
          as="h2"
          fontWeight="bold"
          lineHeight={{ base: "40px", lg: "50px" }}
          fontSize={{ base: 32, lg: 47 }}
          mb={{ base: "11.11px", lg: "5px" }}
        >
          {heading}
        </Text>
      )}
      <Flex flexDir="column" align="stretch">
        {title && (
          <Text
            as="h3"
            mb={{ base: "12.11px", lg: "10px" }}
            lineHeight={{ base: "22px", lg: "30px" }}
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="500"
          >
            {title}
          </Text>
        )}
        {subTitle && (
          <Text fontWeight="bold" fontSize="16px" lineHeight="22px" mb="8px">
            {subTitle}
          </Text>
        )}
        {description && (
          <Box d={{ lg: "flex" }} justifyContent={{ lg: "space-between" }}>
            <Text
              lineHeight={{ base: "22px", lg: "30px" }}
              fontSize="16px"
              mb={{ base: "15.31px", lg: 0 }}
            >
              {description}
            </Text>
            {ctaTopLabel && <Link marginBottom="20px" {...linkStyles} href={ctaTopLink} >
              {ctaTopLabel}
            </Link>}
          </Box>
        )}

        <Flex
          flexWrap="wrap"
          flexDirection={{ base: "column", lg: "row" }}
          gridGap={{ base: "10px", lg: "19px" }}
          mt={{ base: "15.31px", lg: "20px" }}
        >
          {offers &&
            offers?.map((plan: ExpandableSimPlanCardProps) => (
              <Box
                maxW={{ lg: "400px" }}
                minW={{ base: "320px", lg: "400px" }}
                w="100%"
                key={plan.planName}
              >
                <ExpandableSimPlanCard {...plan} showLabel={showLabel} buttonLabel={buttonLabel} previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />} />
              </Box>
            ))}
        </Flex>
        {ctaBottomLabel && (
          <Button
            variant="outline"
            mt={{ base: "20px", lg: "30px" }}
            minW={{ base: "100%", lg: "320px" }}
            alignSelf="center"
            onClick={() => {
               history.push("/prepaid", history.location.state);
            }}
          >
            {ctaBottomLabel}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default PlanOffers;
