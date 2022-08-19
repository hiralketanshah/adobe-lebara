import {MapTo} from "@adobe/aem-react-editable-components";
import OrderSubmittedRoute from "@lebara/core/rotues/OrderSubmittedRoute";

const OrderSubmittedConfig = {

    emptyLabel: "Order Confirmation Component",

    isEmpty: function (props) {
        return !props.thankYouMessage
    },

};
MapTo("lebara/components/confirmationmessage")(OrderSubmittedRoute, OrderSubmittedConfig);