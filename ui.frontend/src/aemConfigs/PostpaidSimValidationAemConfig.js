import { MapTo } from "@adobe/aem-react-editable-components";
//import PostpaidSimValidation from "@lebara/ui/src/components/PostpaidSimValidation";

const PostpaidSimValidationConfig = {
  emptyLabel: "Postpaid Sim Validation component",
  isEmpty: function (props) {
    return !props.verifySimHeading;
  },
};

MapTo("lebara/components/postpaidsimvalidation")(<></>, PostpaidSimValidationConfig);
