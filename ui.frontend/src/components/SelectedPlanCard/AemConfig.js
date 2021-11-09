import { MapTo } from "@adobe/aem-react-editable-components";
import SelectedPlanCard from "./SelectedPlanCard";

const SelectedPlanCardConfig = {
  emptyLabel: "Dynamic Cart Component",
  isEmpty: function () {
    return true;
  },
};

MapTo("lebara/components/dynamiccart")(SelectedPlanCard, SelectedPlanCardConfig);
