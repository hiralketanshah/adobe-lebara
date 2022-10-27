import { MapTo } from "@adobe/aem-react-editable-components";
import EmailSupport from "./EmailSupport";

const EmailSupportConfig = {
  emptyLabel: "Email Support Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/emailsupport")(EmailSupport, EmailSupportConfig);
