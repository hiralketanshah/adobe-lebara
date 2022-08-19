import { MapTo } from "@adobe/aem-react-editable-components";
import {Addons} from "@lebara/core/components";

const AddOnsConfig = {
  emptyLabel: "Dahsboard Addons component",
  isEmpty: function (props) {
    return !props.leftQuantity;
  },
};

MapTo("lebara/components/dashboard/addons")(Addons, AddOnsConfig);