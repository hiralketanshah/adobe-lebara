import { MapTo } from "@adobe/aem-react-editable-components";
import Login from "./LoginRoute";

const LoginConfig = {
  emptyLabel: "Login Component",
  isEmpty: function (props) {
    return !props.loginLabel;
  },
};

MapTo("lebara/components/loginmodule")(Login, LoginConfig);
