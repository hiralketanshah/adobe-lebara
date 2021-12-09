import {MapTo} from "@adobe/aem-react-editable-components";
import DashboardAllowances from "@lebara/ui/src/components/DashboardAllowances/DashboardAllowances"

const DashboardAllowancesConfig = {
  emptyLabel: "Dashboard Allowances component",
  isEmpty: function (props) {
    return true;
  },
};
MapTo("lebara/components/dashboard/dashboardallowances")(DashboardAllowances, DashboardAllowancesConfig);