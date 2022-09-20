import { MapTo } from "@adobe/aem-react-editable-components";
import DashboardPlans from "@lebara/core/components/DashboardPlans/DashboardPlans"
import aemUtils from "../../utils/aem-utils";
import { Flex } from "@chakra-ui/react";
const DashboardPlansConfig = {
  emptyLabel: "Dashboard Plans component",
  isEmpty: function (props) {
    return true;
  },
};
const componentwithofferDataProp = (props) => <Flex flexDirection="column" alignItems="center">
  <Flex
    w={{ base: "100%", lg: "846px" }}
    flexDirection="column"
    px={{ base: "20px", lg: 0 }}
    gridGap={{ base: "17px", lg: "20px" }}
    pt={{ base: "17px", lg: "20px" }}
  ><DashboardPlans {...props} fetchDataCallback={(id, isOneEntry) => aemUtils.fetchData(id, isOneEntry)} />
  </Flex>
</Flex>;
MapTo("lebara/components/dashboard/dashboardplans")(componentwithofferDataProp, DashboardPlansConfig);