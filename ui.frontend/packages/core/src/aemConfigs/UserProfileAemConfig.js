import { MapTo } from "@adobe/aem-react-editable-components";
import UserPersonalDetailsRoute from "@lebara/core/routes/UserPersonalDetailsRoute";

const UserPersonalDetailsRouteConfig = {
  emptyLabel: "User Details Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/user/myprofile")(UserPersonalDetailsRoute, UserPersonalDetailsRouteConfig);
