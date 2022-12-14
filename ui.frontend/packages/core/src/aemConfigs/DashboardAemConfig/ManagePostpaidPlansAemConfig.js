import { MapTo } from "@adobe/aem-react-editable-components";
import PlanManagement from "@lebara/core/components/PlanManagement/PlanManagement";
import aemUtils from "../../utils/aem-utils";

const PlansConfig = {
  emptyLabel: "Manage Postpaid Plans component",
  isEmpty: function (props) {
    return true;
  },
};
const componentwithofferDataProp=(props)=> <PlanManagement  {...props} fetchDataCallback={(id, isOneEntry)=> aemUtils.fetchData(id, isOneEntry)}/>;
MapTo("lebara/components/dashboard/managepostpaidplans")(componentwithofferDataProp, PlansConfig);