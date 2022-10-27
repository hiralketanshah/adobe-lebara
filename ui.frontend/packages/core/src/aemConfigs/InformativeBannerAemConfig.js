import { MapTo } from "@adobe/aem-react-editable-components";
import InformativeBanner from "@lebara/netherlands/components/InformativeBanner/index";

const InformativeBannerConfig = {
    emptyLabel: "Informative Banner Component",
    isEmpty: function (props) {
      return !props || !props.title;
    }
};

MapTo("lebara/components/informativebanner")(InformativeBanner, InformativeBannerConfig);