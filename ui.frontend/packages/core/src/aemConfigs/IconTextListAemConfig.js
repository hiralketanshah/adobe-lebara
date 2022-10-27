import { MapTo } from "@adobe/aem-react-editable-components";
import SimPurchaseInfo from "@lebara/netherlands/components/SimPurchaseInfo/SimPurchaseInfo";
const IconTextListConfig = {
  emptyLabel: "Icon Text List Component",
  isEmpty: function (props) {
    return !props || !props.listData;
  },
};

MapTo("lebara/components/icontextlist")(SimPurchaseInfo, IconTextListConfig);
