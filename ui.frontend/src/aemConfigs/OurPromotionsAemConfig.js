import { MapTo } from "@adobe/aem-react-editable-components";
import OurPromotion from "@lebara/ui/src/components/SideBar/PromotionSidebar";
const OurPromotionConfig = {
  emptyLabel: "Our Promotion",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/ourpromotions")(OurPromotion, OurPromotionConfig);