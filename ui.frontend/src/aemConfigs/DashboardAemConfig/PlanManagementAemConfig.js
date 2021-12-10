import {MapTo} from "@adobe/aem-react-editable-components";
import PlanManagement from "@lebara/ui/src/components/PlanManagement/PlanManagement"

const PlanManagementConfig = {
  emptyLabel: "Dashboard Manage plans",
  isEmpty: function (props) {
    return true;
  },
};
MapTo("lebara/components/dashboard/planmanagement")(PlanManagement, PlanManagementConfig);