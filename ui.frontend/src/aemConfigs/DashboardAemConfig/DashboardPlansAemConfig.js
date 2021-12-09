import {MapTo} from "@adobe/aem-react-editable-components";
import DashboardPlans from "@lebara/ui/src/components/DashboardPlans/DashboardPlans"

const DashboardPlansConfig = {
  emptyLabel: "Dashboard Plans component",
  isEmpty: function (props) {
    return true;
  },
};
MapTo("lebara/components/dashboard/dashboardplans")(DashboardPlans, DashboardPlansConfig);