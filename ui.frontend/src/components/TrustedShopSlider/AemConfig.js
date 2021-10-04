import { MapTo } from "@adobe/aem-react-editable-components";
import TrustedShopSlider from "./TrustedShopSlider";

const TrustedShopSliderConfig = {
    emptyLabel: "Review Component",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/review")(TrustedShopSlider, TrustedShopSliderConfig);
