import { MapTo } from "@adobe/aem-react-editable-components";
import SelectedPlanCard from "./SelectedPlanCard";

const SelectedPlanCardConfig = {
  emptyLabel: "Selected Plan",
  isEmpty: function (props) {
    return !props.selectedPlan;
  },
};

MapTo("lebara/components/dynamiccart")(SelectedPlanCard, SelectedPlanCardConfig);
