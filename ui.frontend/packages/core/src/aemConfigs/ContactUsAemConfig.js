import { MapTo } from "@adobe/aem-react-editable-components";
import ContactUs from "@lebara/core/components/ContactUs/ContactUs";

const ContactUsConfig = {
  emptyLabel: "Contact Us Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/support")(ContactUs, ContactUsConfig);
