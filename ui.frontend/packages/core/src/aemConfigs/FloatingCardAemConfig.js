import { MapTo } from "@adobe/aem-react-editable-components";
import FloatingCard from "@lebara/netherlands/components/FloatingCard/index";

const FloatingCardConfig = {
  emptyLabel: "Floating Card Component",
  isEmpty: function (props) {
    return !props || !props.stickyTotalLabel;
  },
};

MapTo("lebara/components/nl/floatingcard")(FloatingCard, FloatingCardConfig);