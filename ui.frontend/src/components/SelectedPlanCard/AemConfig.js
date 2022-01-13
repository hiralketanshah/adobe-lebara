import { MapTo } from "@adobe/aem-react-editable-components";
import SelectedPlanCard from "@lebara/ui/src/components/SelectedPlanCard/SelectedPlanCard";
import aemUtils from "../../utils/aem-utils";
const SelectedPlanCardConfig = {
  emptyLabel: "Dynamic Cart Component",
  isEmpty: function () {
    return true;
  },
};
const componentwithofferDataProp = (props) => <SelectedPlanCard {...props} fetchDataCallback={(id, isOneEntry) => aemUtils.fetchData(id, isOneEntry)} />;
MapTo("lebara/components/dynamiccart")(componentwithofferDataProp, SelectedPlanCardConfig);
