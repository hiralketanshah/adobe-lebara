import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPromotion from "@lebara/netherlands/components/PostpaidPromotion/PostpaidPromotion"

const DashboardBannerConfig = {
  emptyLabel: "Dashboard Banner component",
  isEmpty: function (props) {
    return !props.onClickRedirectUrl;
  },
};

MapTo("lebara/components/dashboardbanner")(PostpaidPromotion, DashboardBannerConfig);