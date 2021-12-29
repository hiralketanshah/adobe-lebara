//@ts-nocheck
import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { PlanCardProps } from "./types";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import Button from "../Button/Button";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import TickInCircle from "../../icons/TickInCircle";
import {googleAnalytics} from "../../utils/gtm";

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

  React.useEffect(() => {
    const impressions = offers.map(plan => {
      const data = plan?.offerType === "prepaid" ? plan?.allowanceList.find(t => t.name === "Data")?.formatedValue : plan?.allowanceList.find(t => t.name === "DE_Postpaid_Data")?.formatedValue;
      const internationalMinutes = plan?.offerType === "prepaid" ? plan?.allowanceList.find(t => t.name === "DE_Srilanka_India_EU_voice")?.value : plan?.allowanceList.find(t => t.name === "DE_Postpaid_Intl_Mins")?.value;
      const minutes = plan?.offerType === "prepaid" ? plan?.allowanceList.find(t => t.name === "DE_National_Voice")?.value : "Unlimited";
      return {
        currencyCode: "EUR",
        detail: {
          products: [
            {
              id: plan?.id,
              name: plan.planName,
              price: plan.cost,
              brand: "Lebara",
              category: `plan/${plan.planName}///${data} - ${minutes} national minutes - ${internationalMinutes} International Minutes`,
              variant: "DE",
              quantity: 1,
            },
          ],
        },
      };
    });
    googleAnalytics("EElistPage", {
      currencyCode: "EUR",
      impressions,
    });
  }, [offers]);


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
          {offers &&
            offers?.map((plan: ExpandableSimPlanCardProps) => (
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
