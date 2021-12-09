import { MapTo } from "@adobe/aem-react-editable-components";
import PromoBannerSmall from "@lebara/ui/src/components/PromoBannerSamall/PromoBannerSmall";

const PromoBannerSmallConfig = {
  emptyLabel: "Dashboard - Promotion Banner Small",

  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/promobannersmall")(PromoBannerSmall, PromoBannerSmallConfig);
