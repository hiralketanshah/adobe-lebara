import { MapTo } from "@adobe/aem-react-editable-components";
import Banner from "./Banner";

const BannerConfig = {
  emptyLabel: "Banner Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/banner")(Banner, BannerConfig);
