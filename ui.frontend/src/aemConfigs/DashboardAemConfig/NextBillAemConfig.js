import { MapTo } from "@adobe/aem-react-editable-components";
import NextBill from "@lebara/core/components/NextBill/NextBill";

const NextBillConfig = {
  emptyLabel: "Next Bill component",
  isEmpty: function () {
    return true;
  },
};

MapTo("lebara/components/dashboard/nextbill")(NextBill, NextBillConfig);