import { MapTo } from "@adobe/aem-react-editable-components";
import Aboutlebara from "./Aboutlebara";

const AboutlebaraConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(Aboutlebara, AboutlebaraConfig);
