import React from "react";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { EmptyCartShopCardProps } from "./types";
import ExpandableSimPlanCard from "../ExpandableSimPlanCard/ExpandableSimPlanCard";

const EmptyCartShopCard: React.FC<EmptyCartShopCardProps> = ({
  expandableAddOnsCardProps,
  expandablePlanCardProps,
  expandableSimPlanCardProps,
  shopBuyLabel,
  cartDescription,
  addOnTabLabel,
  dataTabLabel,
  plansTabLabel,
}) => {
  const location = useLocation<{ selectedType: string }>();
  const selectedType = location.state?.selectedType || "plan";
  return (
    <Box
      boxShadow="md"
      bg="linear-gradient(90deg, #102B56 0.95%, #25295A 48.41%, #2A2758 54.09%, #372659 67.5%, #47255E 75.24%, #51235E 100%)"
      borderRadius={8}
    >
      <Box
        p="1em"
        py="1.2em"
        textAlign="center"
        borderBottom="0.50px solid cyan"
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
        <Text fontWeight="400" fontSize="14px" lineHeight="20px" color="white">
          {cartDescription}
        </Text>
      </Box>
      <Box mt="1em">
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
                borderBottom: "1px solid",
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
                borderBottom: "1px solid",
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
          <TabPanels>
            <TabPanel>
              <ExpandableSimPlanCard {...expandableAddOnsCardProps} />
            </TabPanel>
            <TabPanel color="primary.600">
              <ExpandableSimPlanCard {...expandablePlanCardProps} />
            </TabPanel>
            <TabPanel color="primary.600">
              <ExpandableSimPlanCard {...expandableSimPlanCardProps} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default EmptyCartShopCard;
