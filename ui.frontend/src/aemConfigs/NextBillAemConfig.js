import { MapTo } from "@adobe/aem-react-editable-components";
import NextBill from "@lebara/ui/src/components/NextBill/NextBill";

const NextBillConfig = {
  emptyLabel: "Next Bill component",
  isEmpty: function () {
    return true;
  },
};

MapTo("lebara/components/dashboard/nextbill")(NextBill, NextBillConfig);