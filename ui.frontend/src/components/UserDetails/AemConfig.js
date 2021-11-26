import { MapTo } from "@adobe/aem-react-editable-components";
import UserDetails from "./UserDetails";

const UserDetailsConfig = {
  emptyLabel: "User Details Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/myprofile")(UserDetails, UserDetailsConfig);
