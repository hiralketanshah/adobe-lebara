import { MapTo } from "@adobe/aem-react-editable-components";
import WeAreHere from "./index";

const WeAreHereConfig = {
  emptyLabel: "We Are Here Component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/wearehere")(WeAreHere, WeAreHereConfig);
