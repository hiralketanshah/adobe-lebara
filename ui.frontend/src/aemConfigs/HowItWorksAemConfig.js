import { MapTo } from "@adobe/aem-react-editable-components";
import HowItWorks from "@lebara/ui/src/components/HowItWorks/HowItWorks";

const HowItWorksConfig = {
    emptyLabel: "How it works component",
    isEmpty: function (props) {
      return !props || !props.title;
    },
};

MapTo("lebara/components/howitworks")(HowItWorks, HowItWorksConfig);
