import { MapTo } from "@adobe/aem-react-editable-components";
import Banner from "./Banner";

const BannerConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(Banner, BannerConfig);
