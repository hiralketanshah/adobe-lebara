import { MapTo } from "@adobe/aem-react-editable-components";
import FMVNOSimMigrationRoute from "@lebara/core/routes/FMVNOSimMigrationRoute";

const PostpaidSimValidationConfig = {
  emptyLabel: "Postpaid Sim Validation component",
  isEmpty: function (props) {
    return !props.verifySimHeading;
  },
};

MapTo("lebara/components/postpaidsimvalidation")(FMVNOSimMigrationRoute, PostpaidSimValidationConfig);
