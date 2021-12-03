import { MapTo } from "@adobe/aem-react-editable-components";
import Usp from "@lebara/ui/src/components/WhyChooseLebara/WhyChooseLebara"
const UspConfig = {
  emptyLabel: "Usp",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/usp")(Usp, UspConfig);
