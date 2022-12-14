import { MapTo } from "@adobe/aem-react-editable-components";
import VerfiyRegisterMobileRoute from "@lebara/core/routes/VerifyRegisterMobileRoute";


const VerifyMobileNumberConfig = {
  emptyLabel: "Verify Mobile Number component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/verifymobile")(VerfiyRegisterMobileRoute, VerifyMobileNumberConfig);