//@ts-nocheck
import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { PlanCardProps } from "./types";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import Button from "@lebara/core/components/Button/Button";
import { useHistory } from "@lebara/core/hooks/useHistory";
import TickInCircle from "../../icons/TickInCircle";
import {googleAnalytics, getTypes} from "../../utils/gtm";
import aemUtils from "../../utils/aem-utils";

const ViewPlans: React.FC<PlanCardProps> = ({
  title,
  description,
  showLabel,
  ctaTopLink,
  ctaTopLabel,
  exploreAllLabel,
  exploreAllLink,
  buttonLabel,
  addedtoCartLabel,
  viewCartLabel,
  offers,
  productInformationButtonLabel,
  ctaSelectLabel,
  ctaAddToCartLabel,
  ctaCloseLabel,
  ctaDownloadLabel,
  minutesLabel,
}) => {
  const history = useHistory();
  const linkStyles = {
    fontSize: "14px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
    color: "var(--chakra-colors-pink-500);"
  };
  const filteredOffers = offers?.filter(aemUtils.filterByWebChannel);
  React.useEffect(() => {
    const impressions = filteredOffers.map((plan, index) => ({
      id: plan?.id,
      name: plan.planName,
      price: plan.cost,
      brand: "Lebara",
      category: `plan/${plan.planName}///`,
      variant: getTypes(plan),
      position: index + 1,
    }));
    googleAnalytics(filteredOffers?.every(t => t.offerType === "postpaid") ? "EElistPageA" : filteredOffers?.every(t => t.offerType === "prepaid") ? "EElistPageB" : "EElistPageC", {
      currencyCode: "EUR",
      impressions,
    });
  }, [filteredOffers]);


  return (
    <Box
      backgroundColor="lightenPrimary.50"
      backgroundPosition="center right"
      backgroundRepeat="no-repeat"
      py={{ base: "30.68px", lg: "60px" }}
      px={{ base: "20px", lg: "80px" }}
    >
      <Flex flexDir="column" align="stretch">
        {title && (
          <Text
            as="h3"
            mb={{ base: "12.11px", lg: "10px" }}
            lineHeight={{ base: "22px", lg: "30px" }}
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="500"
            color="primary.600"
          >
            {title}
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
          {filteredOffers &&
            filteredOffers?.map((plan: ExpandableSimPlanCardProps) => (
              <Box
                maxW={{ lg: "400px" }}
                minW={{ base: "320px", lg: "400px" }}
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
                  previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />} />
              </Box>
            ))}
        </Flex>
        {exploreAllLabel && (
          <Button
            variant="outline"
            mt={{ base: "20px", lg: "30px" }}
            minW={{ base: "100%", lg: "320px" }}
            alignSelf="center"
            onClick={() => {
               history.push((exploreAllLink || "/prepaid"), history.location.state);
            }}
          >
            {exploreAllLabel}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default ViewPlans;
