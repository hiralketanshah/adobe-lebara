import { MapTo } from "@adobe/aem-react-editable-components";
import Iframe from "./Iframe";

const IframeConfig = {
  emptyLabel: "Iframe Component",
  isEmpty: function (props) {
    return !props.url;
  },
};

MapTo("lebara/components/iframe")(Iframe, IframeConfig);
