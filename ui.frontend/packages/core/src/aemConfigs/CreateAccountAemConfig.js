import { MapTo } from "@adobe/aem-react-editable-components";
import DesktopCreateAccountForm from "@lebara/core/components/DesktopCreateAccountForm/DesktopCreateAccountForm";

const DesktopCreateAccountFormConfig = {
  emptyLabel: "Create Account Form Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/createaccount")(DesktopCreateAccountForm, DesktopCreateAccountFormConfig);
