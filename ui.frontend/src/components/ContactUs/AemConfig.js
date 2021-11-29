import { MapTo } from "@adobe/aem-react-editable-components";
import ContactUs from "./ContactUs";

const ContactUsConfig = {
  emptyLabel: "Contact Us Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/support")(ContactUs, ContactUsConfig);
