import { MapTo } from "@adobe/aem-react-editable-components";
import RetentionRenewBanner from "@lebara/core/components/RetentionRenewBanner/RetentionRenewBanner";

const RetentionBannerConfig = {
    emptyLabel: "Retention Banner Component",
    isEmpty: function (props) {
      return true;
    }
};

MapTo("lebara/components/retentionbanner")(RetentionRenewBanner, RetentionBannerConfig);