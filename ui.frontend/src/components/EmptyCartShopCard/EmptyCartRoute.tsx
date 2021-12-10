import React from "react";
import "@adyen/adyen-web/dist/adyen.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import BuyPlanLayout from "@lebara/ui/src/layouts/BuyPlanLayout";
import EmptyCartShopCard from "./EmptyCartShopCard";
import Button from "@lebara/ui/src/components/Button/Button";
import { EmptyCartShopCardProps } from "./types";

const EmptyCartRoute: React.FC<EmptyCartShopCardProps> = ({
  ...props
}) => {
  const history = useHistory();
  const {emptyBasketText, goBackText, continueBrowsinglink, continueBrowsingLabel, fullWidth} = props;
  return (
    <BuyPlanLayout hideButton noPadding fullWidth={fullWidth}>
      <Box {...!fullWidth? {py: "5px", px: "20px"} : {}}>
        <>
          <Flex flexDir="column" alignItems="left" back color="#13357A">
            {emptyBasketText && <Text fontWeight="700" fontSize="20px" lineHeight="40px">
              {emptyBasketText}
            </Text>}
            {goBackText && <Text
              mb="20px"
              fontWeight="400"
              fontSize="14px"
              mt="5px"
              lineHeight="20px"
            >
              {goBackText}
            </Text>}
          </Flex>
        </>
        <Box>
            <EmptyCartShopCard {...props}/>
        </Box>
      </Box>
      {continueBrowsingLabel && <Box textAlign="center" pt="26px" pb="33px">
        <Button
          variant="ghost"
          fontWeight="700"
          size="16px"
          color="secondary.500"
          onClick={() => history.push(continueBrowsinglink || "/")}
        >
          {continueBrowsingLabel}
        </Button>
      </Box>}
    </BuyPlanLayout>
  );
};

export default EmptyCartRoute;