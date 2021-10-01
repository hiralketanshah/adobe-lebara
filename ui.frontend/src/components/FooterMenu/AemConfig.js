import { MapTo } from "@adobe/aem-react-editable-components";
import FooterMenu from "./FooterMenu";

const FooterMenuConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.desktopFootertext || !props.followus || !props.getapp || !props.copyrightText || !props.copyrightLinks;
    },
};

MapTo("lebara/components/faq")(FooterMenu, FooterMenuConfig);
