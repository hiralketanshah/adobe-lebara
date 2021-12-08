import { MapTo } from "@adobe/aem-react-editable-components";
import SimChoiceRoute from "@lebara/ui/src/rotues/SimChoiceRoute";

const PortingConfig = {
  emptyLabel: "Sim Porting component",
  isEmpty: function (props) {
    return !props.description;
  },
};

MapTo("lebara/components/porting")(SimChoiceRoute, PortingConfig);