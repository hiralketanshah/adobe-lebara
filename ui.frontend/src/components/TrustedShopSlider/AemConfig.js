import { MapTo } from "@adobe/aem-react-editable-components";
import FAQ from "./TrustedShopSlider";

const TrustedShopSliderConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(TrustedShopSlider, TrustedShopSliderConfig);
