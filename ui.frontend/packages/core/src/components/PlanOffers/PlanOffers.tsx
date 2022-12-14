// @ts-nocheck
// import React, { useEffect, useRef } from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import { PlanOffersProps } from "./types";
import Link from "@lebara/core/components/Link/Link";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import Button from "@lebara/core/components/Button/Button";
import { useHistory, useLocation } from "@lebara/core/hooks/useHistory";
import TickInCircle from "../../icons/TickInCircle";
import React from "react";
import {googleAnalytics, getTypes} from "../../utils/gtm";
import aemUtils from "../../utils/aem-utils";
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
  buttonLabel,
  addedtoCartLabel,
  viewCartLabel,
  backgroundColor,
  productInformationButtonLabel,
  ctaSelectLabel,
  ctaAddToCartLabel,
  ctaCloseLabel,
  ctaDownloadLabel,
  ctaBottomLink,
  minutesLabel,
  textAlignment,
  columnsView = 3,
  labelTextColor = "primary.600",
  showModelOnAddtoCart =false,
  imageForStructuredData,
  showStructuredData,
}) => {
  const history = useHistory();
  const linkStyles = {
    fontSize: "14px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
  };
  const location = useLocation();
  const filteredOffers = offers?.filter(aemUtils.filterByWebChannel);
  React.useEffect(() => {
    const impressions = filteredOffers?.map((plan, index) => ({
      id: plan?.id,
      name: plan.planName,
      price: plan.cost,
      brand: "Lebara",
      category: `plan/${plan.planName}///`,
      variant: getTypes(plan),
      list: location.pathname,
      position: index + 1
    }));
    googleAnalytics(filteredOffers?.every(t => t.offerType === "postpaid") ? "EElistPageA" : filteredOffers?.every(t => t.offerType === "prepaid") ? "EElistPageB" : "EElistPageC", {
      currencyCode: "EUR",
      impressions,
    });
  }, [filteredOffers]);
  
  const mainEntityValue = filteredOffers?.map((offer: any) => {
  let filteredAllowanceList: allowanceListProps = {};
  const dataAllowanceType: allowanceListProps | undefined = offer.allowanceList && offer.allowanceList.find((list) => list.name && list.name.toLowerCase().includes('data'));
  if (dataAllowanceType) {
    filteredAllowanceList = dataAllowanceType;
  } else {
    filteredAllowanceList = (offer.allowanceList && offer.allowanceList.find((list) => list.name && (!list.name.toLowerCase().includes('data') || !list.name.toLowerCase().includes('national_voice')
      || !list.name.toLowerCase().includes('l2l')))) || {};
  }
  return ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${offer?.planName}`,
    description: `${filteredAllowanceList?.formatedValue} | ${offer?.planInfo?.listPlanItem}`,
    image: imageForStructuredData,
    sku: `${offer?.id}`,
    brand: {
      "@type": "Brand",
      name: "Lebara",
    },
    offers: {
      "@type": "Offer",
      url: `${window.location.href}`,
      priceCurrency: `${window.lebaraGlobalConfigs.currencyName}`,
      price: `${offer?.cost} ${window.lebaraGlobalConfigs.currencySymbol}`,
      itemCondition: "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
    },
  
  })});
  return (
    <Box
      backgroundColor={backgroundColor ? backgroundColor : `lightenPrimary.50`}
      backgroundPosition="center right"
      textAlign={textAlignment || "left"}
      backgroundRepeat="no-repeat"
      py={{ base: "30.68px", lg: "60px" }}
      px={{ base: "20px", lg: "80px" }}
      color={labelTextColor}
    >
    {showStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(mainEntityValue)}
        </script>
      )}
      {heading && (
        <Heading
          color={labelTextColor || "primary.600"}
          as="h1"
          fontWeight="bold"
          lineHeight={{ base: "40px", lg: "50px" }}
          fontSize={{ base: 32, lg: 47 }}
          mb={{ base: "11.11px", lg: "5px" }}
        >
          {heading}
        </Heading>
      )}
      <Flex flexDir="column" align="stretch">
        {title && (
          <Heading
            color = {labelTextColor || "primary.500"}
            as="h2"
            textAlign={textAlignment}
            mb={{ base: "12.11px", lg: "10px" }}
            mt={{ base: "20px", lg: "30px" }}
            lineHeight={{ base: "22px", lg: "30px" }}
            fontSize={{ base: "20px", lg: "32px" }}
            fontWeight="bold"
          >
            {title}
          </Heading>
        )}
        {subTitle && (
          <Heading as="h3" fontWeight="bold" fontSize="16px" lineHeight="22px" mb="8px" textAlign={textAlignment}>
            {subTitle}
          </Heading>
        )}
        {description && (
          <Box d={{ lg: "flex" }} justifyContent={{ lg: "space-between" }}>
            <Text
              lineHeight={{ base: "22px", lg: "30px" }}
              fontSize="16px"
              textAlign={textAlignment}
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
          gridGap={{ base: "10px", lg: "15px" }}
          mt={{ base: "15.31px", lg: "20px" }}
        >
          {filteredOffers &&
            filteredOffers?.map((plan: ExpandableSimPlanCardProps) => (
              <Box
                flex={1}
                maxW={{ lg: `${100 / columnsView - 2}%` }}
                minW={{ base: "285px", lg: `${100 / columnsView - 2}%` }}
                w="100%"
                key={plan.planName}
              >
                <ExpandableSimPlanCard {...plan} showLabel={showLabel}
                  productInformationButtonLabel={productInformationButtonLabel}
                  buttonLabel={buttonLabel}
                  ctaSelectLabel={ctaSelectLabel}
                  ctaAddToCartLabel={ctaAddToCartLabel}
                  ctaCloseLabel={ctaCloseLabel}
                  ctaDownloadLabel={ctaDownloadLabel}
                  addedtoCartLabel={addedtoCartLabel}
                  viewCartLabel={viewCartLabel}
                  minutesLabel={minutesLabel}
                  previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />}
                  textAlignment={textAlignment}
                  showModelOnAddtoCart={showModelOnAddtoCart} />
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
              history.push((ctaBottomLink || "/prepaid"), history.location.state);
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