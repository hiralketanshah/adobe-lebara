import { MapTo } from "@adobe/aem-react-editable-components";
import YourPlansCard from "./YourPlansCard";

const YourPlansCardConfig = {
  emptyLabel: "Dahsboard Prepaid Plans component",
  isEmpty: function (props) {
    return !props.planName;
  },
};

MapTo("lebara/components/dashboard/prepaidplans")(YourPlansCard, YourPlansCardConfig);