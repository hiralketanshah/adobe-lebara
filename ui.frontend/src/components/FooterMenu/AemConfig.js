import { MapTo } from "@adobe/aem-react-editable-components";
import FooterMenu from "./FooterMenu";

const FooterMenuConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(FooterMenu, FooterMenuConfig);
