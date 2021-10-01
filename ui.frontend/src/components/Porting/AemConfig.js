import { MapTo } from "@adobe/aem-react-editable-components";
import Porting from "./Porting";

const PortingConfig = {
  emptyLabel: "Porting",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/faq")(Porting, PortingConfig);
