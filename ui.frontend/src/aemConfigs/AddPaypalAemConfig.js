import { MapTo } from "@adobe/aem-react-editable-components";
import AddPaypal from "@lebara/ui/src/components/AddPaypal/AddPaypal";

const AddPaypalConfig = {
  emptyLabel: "Add Paypal component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/addpaypal")(AddPaypal, AddPaypalConfig);