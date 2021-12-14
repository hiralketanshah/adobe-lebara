import { MapTo } from "@adobe/aem-react-editable-components";
import DashboardAllowances from "@lebara/ui/src/components/DashboardAllowances/DashboardAllowances"
import { Flex } from "@chakra-ui/react";
const DashboardAllowancesConfig = {
  emptyLabel: "Dashboard Allowances component",
  isEmpty: function (props) {
    return true;
  },
};
const wrappedComponent = (props) =>
  <Flex flexDirection="column" alignItems="center">
    <Flex
      w={{ base: "100%", lg: "846px" }}
      flexDirection="column"
      px={{ base: "20px", lg: 0 }}
      gridGap={{ base: "17px", lg: "20px" }}
      pt={{ base: "17px", lg: "20px" }}
    ><DashboardAllowances {...props} />
    </Flex>
  </Flex>;
MapTo("lebara/components/dashboard/dashboardallowances")(wrappedComponent, DashboardAllowancesConfig);