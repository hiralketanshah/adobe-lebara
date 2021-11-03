import { MapTo } from "@adobe/aem-react-editable-components";
import SwitchRoute from "./SwitchRoute";

const LoginConfig = {
  emptyLabel: "Login Component",
  isEmpty: function (props) {
    return !props.loginLabel;
  },
};

MapTo("lebara/components/loginmodule")(SwitchRoute, LoginConfig);
