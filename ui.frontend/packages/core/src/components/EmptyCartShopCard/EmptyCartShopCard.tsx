import React from "react";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";
import TickInCircle from "@lebara/core/icons/TickInCircle";
import { EmptyCartShopCardProps } from "./types";
import { ExpandableSimPlanCardProps } from "../ExpandableSimPlanCard/types";
import aemUtils from "../../utils/aem-utils";

const EmptyCartShopCard: React.FC<EmptyCartShopCardProps> = ({
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
  addToCartLabel,
  viewCartLabel,
  addedtoCartLabel,
  showModelOnAddtoCart
}) => {
  const location = useLocation<{ selectedType: string }>();
  const selectedType = location.state?.selectedType || "plan";
  return (
    <Box
      boxShadow="md"
      bg="linear-gradient(90deg, #102B56 0.95%, #25295A 48.41%, #2A2758 54.09%, #372659 67.5%, #47255E 75.24%, #51235E 100%)"
      borderRadius={{ base: "12px", lg: 0 }}
    >
      <Box
        p="1em"
        py="1.2em"
        textAlign="center"
        borderBottom={{ base: "0.50px solid #00A6EB", lg: "none" }}
      >
        <Text
          fontWeight="500"
          fontSize="24px"
          lineHeight="30px"
          letterSpacing="0.25 px"
          color="white"
        >
          {shopBuyLabel}
        </Text>
        <Text
          fontWeight="400"
          fontSize="16px"
          lineHeight="20px"
          color="white"
          mt="7px"
        >
          {cartDescription}
        </Text>
      </Box>
      <Box mt={{ base: "30px", lg: 0 }}>
        <Tabs
          align="center"
          color="white"
          isLazy
          defaultIndex={
            selectedType === "addon" ? 0 : selectedType === "data" ? 1 : 2
          }
        >
          <TabList borderBottom="none">
            <Tab
              _selected={{
                borderBottom: "2px solid",
                color: "secondary.500",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "22px",
                letterSpacing: "0.15px",
              }}
            >
              {addOnTabLabel}
            </Tab>
            <Tab
              _selected={{
                borderBottom: "2px solid",
                color: "secondary.500",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "22px",
                letterSpacing: "0.15px",
              }}
            >
              {dataTabLabel}
            </Tab>
            <Tab
              _selected={{
                borderBottom: "1px solid",
                color: "secondary.500",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "22px",
                letterSpacing: "0.15px",
              }}
            >
              {plansTabLabel}
            </Tab>
          </TabList>
          <TabPanels width="100%" overflowX="auto">
            {expandableAddOnsCardProps && <TabPanel color="primary.600">
              <Flex
                py="20px"
                justifyContent={{ base: "space-between", md: "center" }}
                gridGap="38px"
                overflowX="auto"
              >
                {expandableAddOnsCardProps.filter(aemUtils.filterByWebChannel).map(
                  (addOnPlan: ExpandableSimPlanCardProps) => (
                    <Box flexDirection="column">
                      <ExpandableSimPlanCard {...addOnPlan}
                        showModelOnAddtoCart={showModelOnAddtoCart}
                        showLabel={showDetailsLabel}
                        buttonLabel={buyPlanLabel}
                        addedtoCartLabel={addedtoCartLabel}
                        viewCartLabel={viewCartLabel}
                        previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />}
                      />
                    </Box>
                  )
                )}
              </Flex>
            </TabPanel>}
            {expandableSimPlanCardProps && <TabPanel color="primary.600">
              <Flex
                py="20px"
                justifyContent={{ base: "space-between", md: "center" }}
                gridGap="38px"
                overflowX="auto"
              >
                {expandableSimPlanCardProps.filter(aemUtils.filterByWebChannel).map(
                  (planCard: ExpandableSimPlanCardProps) => (
                    <Box flexDirection="column">
                      <ExpandableSimPlanCard {...planCard}
                        showModelOnAddtoCart={showModelOnAddtoCart}
                        showLabel={showDetailsLabel}
                        buttonLabel={addToCartLabel}
                        addedtoCartLabel={addedtoCartLabel}
                        viewCartLabel={viewCartLabel}
                        previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />} />
                    </Box>
                  )
                )}
              </Flex>
            </TabPanel>}
           {expandablePlanCardProps && <TabPanel color="primary.600">
              <Flex
                py="20px"
                justifyContent={{ base: "space-between", md: "center" }}
                gridGap="38px"
                overflowX="auto"
              >
                {expandablePlanCardProps.filter(aemUtils.filterByWebChannel).map(
                  (simCardPlan: ExpandableSimPlanCardProps) => (
                    <Box flexDirection="column">
                      <ExpandableSimPlanCard {...simCardPlan}
                        showModelOnAddtoCart={showModelOnAddtoCart}
                        showLabel={showDetailsLabel}
                        buttonLabel={buyPlanLabel}
                        addedtoCartLabel={addedtoCartLabel}
                        viewCartLabel={viewCartLabel}
                        previewIcon={<TickInCircle fill="#13357A" tickFill="#EA4984" />} />
                    </Box>
                  )
                )}
              </Flex>
            </TabPanel>}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default EmptyCartShopCard;
