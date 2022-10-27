import { MapTo } from "@adobe/aem-react-editable-components";
import WelcomeScreen from "./WelcomeScreen";

const WelcomeScreenConfig = {
    emptyLabel: "Welcome Screen",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/app/welcomescreen")(WelcomeScreen, WelcomeScreenConfig);
