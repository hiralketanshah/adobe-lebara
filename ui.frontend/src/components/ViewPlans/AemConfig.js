import { MapTo } from "@adobe/aem-react-editable-components";
import ViewPlans from "./ViewPlans";

const ViewPlansConfig = {
  emptyLabel: "ViewPlans",

  isEmpty: function (props) {
    return !props || !props.offers || !props.buttonLabel;
  },
};

MapTo("lebara/components/embed")(ViewPlans, ViewPlansConfig);
