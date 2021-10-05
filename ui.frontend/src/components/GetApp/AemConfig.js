import { MapTo } from "@adobe/aem-react-editable-components";
import GetApp from "./GetApp";

const GetAppConfig = {
  emptyLabel: "Get APP",
  isEmpty: function (props) {
    return !props.appTitle;
  },
};

MapTo("lebara/components/getapp")(GetApp, GetAppConfig);