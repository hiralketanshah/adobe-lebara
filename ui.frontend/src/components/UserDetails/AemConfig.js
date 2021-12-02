import { MapTo } from "@adobe/aem-react-editable-components";
import LayoutWrapper from "./LayoutWrapper";

const UserDetailsConfig = {
  emptyLabel: "User Details Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/user/myprofile")(LayoutWrapper, UserDetailsConfig);
