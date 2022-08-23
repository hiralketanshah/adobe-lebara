import { MapTo } from "@adobe/aem-react-editable-components";
import AppNavigation from "./AppNavigation";

const AppNavigationConfig = {
    emptyLabel: "App Navigation",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/app/appnavigation")(AppNavigation, AppNavigationConfig);
