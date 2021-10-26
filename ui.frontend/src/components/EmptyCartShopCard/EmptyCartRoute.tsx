import React from "react";
import "@adyen/adyen-web/dist/adyen.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";
import EmptyCartShopCard from "./EmptyCartShopCard";
import Button from "../Button/Button";
import { EmptyCartShopCardProps } from "./types";

const EmptyCartRoute: React.FC<EmptyCartShopCardProps> = ({
  expandableAddOnsCardProps,
  expandablePlanCardProps,
  expandableSimPlanCardProps,
  shopBuyLabel,
  cartDescription,
  addOnTabLabel,
  dataTabLabel,
  plansTabLabel,
  showDetailsLabel,
  buyPlanLabel,
  continueBrowsingLabel,
  emptyBasketText,
  goBackText,
  continueBrowsinglink,
  addToCartLabel,
}) => {
  const history = useHistory();
  
  return (
    <BuyPlanLayout hideButton noPadding>
      <Box backgroundColor="lightenPrimary.50" py="5px" px="20px">
        <>
          <Flex flexDir="column" alignItems="left" back color="#13357A">
            <Text fontWeight="700" fontSize="20px" lineHeight="40px">
              {emptyBasketText}
            </Text>
            <Text
              mb="20px"
              fontWeight="400"
              fontSize="14px"
              mt="5px"
              lineHeight="20px"
            >
              {goBackText}
            </Text>
          </Flex>
        </>
        <Box>
            <EmptyCartShopCard
              expandableAddOnsCardProps={expandableAddOnsCardProps}
              expandablePlanCardProps={expandablePlanCardProps}
              expandableSimPlanCardProps={expandableSimPlanCardProps}
              shopBuyLabel={shopBuyLabel}
              cartDescription={cartDescription}
              addOnTabLabel={addOnTabLabel}
              dataTabLabel={dataTabLabel}
              plansTabLabel={plansTabLabel}
              showDetailsLabel={showDetailsLabel}
              buyPlanLabel={buyPlanLabel}
              addToCartLabel={addToCartLabel}
            />
        </Box>
      </Box>
      <Box textAlign="center" pt="26px" pb="33px">
        <Button
          variant="ghost"
          fontWeight="700"
          size="16px"
          color="secondary.500"
          onClick={() => history.push(continueBrowsinglink || "/")}
        >
          {continueBrowsingLabel}
        </Button>
      </Box>
    </BuyPlanLayout>
  );
};

export default EmptyCartRoute;
