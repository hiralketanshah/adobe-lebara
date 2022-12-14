import { MapTo } from "@adobe/aem-react-editable-components";
import AddEditDebitCreditCardRoute from "@lebara/core/routes/AddEditDebitCreditCardRoute";

const AddEditDebitCreditCardConfig = {
  emptyLabel: "Add/Edit credit/debit card component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/addeditcreditdebitcard")(AddEditDebitCreditCardRoute, AddEditDebitCreditCardConfig);