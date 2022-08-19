import { MapTo } from "@adobe/aem-react-editable-components";
import RecentPost from "@lebara/core/components/SideBar/PostSidebar";
const RecentPostConfig = {
  emptyLabel: "Recent post",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/recentposts")(RecentPost, RecentPostConfig);