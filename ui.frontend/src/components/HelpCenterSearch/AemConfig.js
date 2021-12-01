import { MapTo } from "@adobe/aem-react-editable-components";
import HelpCenterSearch from "./HelpCenterSearch";

const HelpCenterSearchConfig = {
  emptyLabel: "Help Center Search Component",
  isEmpty: function (props) {
    return !props && !props.searchPlaceholder;
  },
};

MapTo("lebara/components/helpcenter/search")(HelpCenterSearch, HelpCenterSearchConfig);