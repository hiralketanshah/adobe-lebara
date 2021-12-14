import {MapTo} from "@adobe/aem-react-editable-components";
import DashboardPlans from "@lebara/ui/src/components/DashboardPlans/DashboardPlans"
import aemUtils from "../../utils/aem-utils";
const DashboardPlansConfig = {
  emptyLabel: "Dashboard Plans component",
  isEmpty: function (props) {
    return true;
  },
};
const componentwithofferDataProp=(props)=> <DashboardPlans fetchDataCallback={(id, isOneEntry)=> aemUtils.fetchData(id, isOneEntry)} {...props}/>;
MapTo("lebara/components/dashboard/dashboardplans")(componentwithofferDataProp, DashboardPlansConfig);