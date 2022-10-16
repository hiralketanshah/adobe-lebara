import { MapTo } from "@adobe/aem-react-editable-components";
import SimPurchaseSummary from "@lebara/netherlands/components/SimPurchaseSummary/index";

const PurchaseSummaryConfig = {
  emptyLabel: "Purchase Summary Component",
  isEmpty: function (props) {
    return !props || !props.title;
  },
};

MapTo("lebara/components/nl/purchasesummary")(SimPurchaseSummary, PurchaseSummaryConfig);
