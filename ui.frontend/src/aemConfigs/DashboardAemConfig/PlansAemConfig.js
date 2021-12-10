import { MapTo } from "@adobe/aem-react-editable-components";
import Plans from "@lebara/ui/src/components/PlanManagement/Plans"
import aemUtils from "../../utils/aem-utils";

const PlansConfig = {
  emptyLabel: "Plans component",
  isEmpty: function (props) {
    return true;
  },
};
  const componentwithofferDataProp=()=> <Plans fetchDataCallback={(id, isOneEntry)=> aemUtils.fetchData(id, isOneEntry)}/>;
MapTo("lebara/components/dashboard/plans")(componentwithofferDataProp, PlansConfig);