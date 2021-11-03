import { MapTo } from "@adobe/aem-react-editable-components";
import CreateNewPasswordRoute from "./CreateNewPasswordRoute";

const ResetPasswordConfig = {
  emptyLabel: "Reset Password Component",
  isEmpty: function (props) {
    return !props.resetPwdTitle;
  },
};

MapTo("lebara/components/createnewpassword")(CreateNewPasswordRoute, ResetPasswordConfig);
