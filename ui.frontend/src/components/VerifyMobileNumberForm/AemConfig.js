import { MapTo } from "@adobe/aem-react-editable-components";
import VerifyMobileNumberForm from "./VerifyMobileNumberForm";

const VerifyMobileNumberFormConfig = {
  emptyLabel: "Verify Mobile Number component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/verifymobile")(VerifyMobileNumberForm, VerifyMobileNumberFormConfig);