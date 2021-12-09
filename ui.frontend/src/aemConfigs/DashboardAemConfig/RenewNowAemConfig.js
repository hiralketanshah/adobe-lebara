import { MapTo } from "@adobe/aem-react-editable-components";
import RenewNow from "@lebara/ui/src/components/RenewNow/RenewNow";

const RenewNowConfig = {
  emptyLabel: "Dashboard - Renew Now",

  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/renewnow")(RenewNow, RenewNowConfig);
