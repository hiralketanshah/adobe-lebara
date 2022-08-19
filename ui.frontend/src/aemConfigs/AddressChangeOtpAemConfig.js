import { MapTo } from "@adobe/aem-react-editable-components";
import UserPersonalDetailsRoute from "@lebara/core/rotues/AddressChangeOtpRoute";

const AddressChangeOtpConfig = {
  emptyLabel: "Address change OTP Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/addresschangeotp")(UserPersonalDetailsRoute, AddressChangeOtpConfig);
