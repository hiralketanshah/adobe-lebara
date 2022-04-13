import { MapTo } from "@adobe/aem-react-editable-components";
import ConfirmEmailTokenRoute from "@lebara/ui/src/rotues/ConfirmEmailTokenRoute";

const ConfirmEmailTokenConfig = {
  emptyLabel: "Confirm Email Token Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/confirmemailtoken")(ConfirmEmailTokenRoute, ConfirmEmailTokenConfig);
