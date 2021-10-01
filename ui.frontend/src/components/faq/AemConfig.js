import { MapTo } from "@adobe/aem-react-editable-components";
import Faq from "./Faq";

const FaqConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(Faq, FaqConfig);
