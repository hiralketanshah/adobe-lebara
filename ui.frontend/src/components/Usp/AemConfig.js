import { MapTo } from "@adobe/aem-react-editable-components";
import Usp from "./Usp";

const UspConfig = {
  emptyLabel: "Usp",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/usp")(Usp, UspConfig);
