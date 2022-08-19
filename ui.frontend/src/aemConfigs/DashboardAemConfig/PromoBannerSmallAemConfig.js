import { MapTo } from "@adobe/aem-react-editable-components";
import PromoBannerSmall from "@lebara/core/components/PromoBannerSamall/PromoBannerSmall";

const PromoBannerSmallConfig = {
  emptyLabel: "Dashboard - Promotion Banner Small",

  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/promobannersmall")(PromoBannerSmall, PromoBannerSmallConfig);
