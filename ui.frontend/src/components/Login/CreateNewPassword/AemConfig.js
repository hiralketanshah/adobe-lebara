import { MapTo } from "@adobe/aem-react-editable-components";
import CreateNewPasswordRoute from "@lebara/ui/src/rotues/CreateNewPasswordRoute";

const CreateNewPasswordConfig = {
  emptyLabel: "Create New Password Component",
  isEmpty: function (props) {
    return !props.resetPwdTitle;
  },
};
MapTo("lebara/components/createnewpassword")(CreateNewPasswordRoute, CreateNewPasswordConfig);