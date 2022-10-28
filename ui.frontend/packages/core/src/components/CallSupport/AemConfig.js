import { MapTo } from "@adobe/aem-react-editable-components";
import CallSupportForm from "./CallSupportForm";

const CallSupportFormConfig = {
  emptyLabel: "Call Support Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/callsupport")(CallSupportForm, CallSupportFormConfig);
