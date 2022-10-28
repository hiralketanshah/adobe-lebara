import { MapTo } from "@adobe/aem-react-editable-components";
import LanguageHeader from "./LanguageHeader";

const LanguageHeaderConfig = {
    emptyLabel: "Language Header",
    isEmpty: function (props) {
      return !props.storeTitle || !props.helpTitle || !props.items;
    },
};

MapTo("lebara/components/header/languagenavigation")(LanguageHeader, LanguageHeaderConfig);
