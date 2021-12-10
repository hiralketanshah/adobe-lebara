import { MapTo } from "@adobe/aem-react-editable-components";
import ChangePasswordContainer from "../components/UserDetails/ChangePasswordContainer";

const ChangePasswordConfig = {
  emptyLabel: "Change Password Component",
  isEmpty: function (props) {
    return !props || !props.changePasswordHeading;
  },
};

MapTo("lebara/components/user/changepassword")(ChangePasswordContainer, ChangePasswordConfig);