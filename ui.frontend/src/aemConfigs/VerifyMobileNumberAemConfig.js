import { MapTo } from "@adobe/aem-react-editable-components";
import VerifyMobileNumber from "@lebara/ui/src/components/VerifyMobileNumberForm/VerifyMobileNumberForm"


const VerifyMobileNumberConfig = {
  emptyLabel: "Verify Mobile Number component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/verifymobile")(VerifyMobileNumber, VerifyMobileNumberConfig);