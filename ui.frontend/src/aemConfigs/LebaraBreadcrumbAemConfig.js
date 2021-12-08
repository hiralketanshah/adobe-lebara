import { MapTo } from "@adobe/aem-react-editable-components";
import LebaraBreadcrumb from "@lebara/ui/src/components/Breadcrumb/LebaraBreadcrumb";

const LebaraBreadcrumbConfig = {
  emptyLabel: "Breadcrumb Component",
  isEmpty: function (props) {
    return !props || !props.items;
  },
};

MapTo("lebara/components/breadcrumb")(LebaraBreadcrumb, LebaraBreadcrumbConfig);
