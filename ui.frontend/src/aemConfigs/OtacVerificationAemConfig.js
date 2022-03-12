import { MapTo } from "@adobe/aem-react-editable-components";
import UserPersonalDetailsRoute from "@lebara/ui/src/rotues/UserPersonalDetailsRoute";

const OtacVerificationConfig = {
  emptyLabel: "Otac Verification Component",
  isEmpty: function (props) {
    return !props || !props.otacVerifyLabel;
  },
};

MapTo("lebara/components/user/otacverification")(UserPersonalDetailsRoute, OtacVerificationConfig);
