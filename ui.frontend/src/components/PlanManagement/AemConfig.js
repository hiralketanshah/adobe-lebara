import { MapTo } from "@adobe/aem-react-editable-components";
import Plans from "./Plans";

const PlansConfig = {
  emptyLabel: "Plans component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/plans")(Plans, PlansConfig);