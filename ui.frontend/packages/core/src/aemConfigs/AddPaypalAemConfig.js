import { MapTo } from "@adobe/aem-react-editable-components";
import PaypalRoute from "@lebara/core/routes/PaypalRoute";

const AddPaypalConfig = {
  emptyLabel: "Add Paypal component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/addpaypal")(PaypalRoute, AddPaypalConfig);