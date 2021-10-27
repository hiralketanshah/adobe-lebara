import { MapTo } from "@adobe/aem-react-editable-components";
import SuccessCard from "./SuccessCard";

const SuccessCardConfig = {
  emptyLabel: "Order Confirmation Component",
  isEmpty: function (props) {
    return !props.thankYouMessage },
};

MapTo("lebara/components/confirmationmessage")(SuccessCard, SuccessCardConfig);
