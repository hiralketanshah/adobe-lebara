import { MapTo } from "@adobe/aem-react-editable-components";
import MiniFooter from "./MiniFooter";

const MiniFooterConfig = {
  emptyLabel: "Mini Footer / Need Help Footer",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/mini-footer")(MiniFooter, MiniFooterConfig);
