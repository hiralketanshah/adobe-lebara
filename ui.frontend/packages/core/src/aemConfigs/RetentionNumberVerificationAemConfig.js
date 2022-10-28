import { MapTo } from "@adobe/aem-react-editable-components";
import RetentionNumberVerification from "@lebara/netherlands/components/RetentionNumberVerification/RetentionNumberVerification";

const RetentionNumberverificationConfig = {
    emptyLabel: "Retention Number Verification Component",
    isEmpty: function (props) {
      return !props.compHeading
    },
};

MapTo("lebara/components/nl/retentionnumberverification")(RetentionNumberVerification, RetentionNumberverificationConfig);