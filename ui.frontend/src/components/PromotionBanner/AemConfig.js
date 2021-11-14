import { MapTo } from "@adobe/aem-react-editable-components";
import PromotionBanner from "./PromotionBanner";

const PromotionBannerConfig = {
  emptyLabel: "Promotion Banner",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/dashboard/promotionbanner")(PromotionBanner, PromotionBannerConfig);