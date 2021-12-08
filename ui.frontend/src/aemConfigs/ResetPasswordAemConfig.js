import { MapTo } from "@adobe/aem-react-editable-components";
import ResetPasswordRoute from "@lebara/ui/src/rotues/ResetPasswordRoute";

const ResetPasswordConfig = {
  emptyLabel: "Reset Password Component",
  isEmpty: function (props) {
    return !props.resetPwdTitle;
  },
};

MapTo("lebara/components/resetpassword")(ResetPasswordRoute, ResetPasswordConfig);
