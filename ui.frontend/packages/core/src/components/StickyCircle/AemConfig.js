import { MapTo } from "@adobe/aem-react-editable-components";
import StickyCircle from "./StickyCircle";

const StickyCircleConfig = {
  emptyLabel: "Sticky Circle component",
  isEmpty: function (props) {
    return !props.linkLabel;
  },
};

MapTo("lebara/components/dashboard/stickycircle")(StickyCircle, StickyCircleConfig);