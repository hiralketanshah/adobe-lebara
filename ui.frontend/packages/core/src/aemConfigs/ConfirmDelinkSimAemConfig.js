import { MapTo } from "@adobe/aem-react-editable-components";
import ConfirmDeLinkSimRoute from "@lebara/core/routes/ConfirmDeLinkSimRoute";

const ConfirmDelinkSimConfig = {
  emptyLabel: "Confirm delink sim Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/user/confirmdelinksim")(ConfirmDeLinkSimRoute, ConfirmDelinkSimConfig);
