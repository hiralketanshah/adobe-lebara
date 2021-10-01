import { MapTo } from "@adobe/aem-react-editable-components";
import FAQ from "./faq";

const FAQConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(FAQ, FAQConfig);
