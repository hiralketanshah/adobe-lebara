import { MapTo } from "@adobe/aem-react-editable-components";
import SidePromotion from "@lebara/ui/src/components/SideBar/PromotionSidebar";

const OurPromotionConfig = {
  emptyLabel: "Our Promotion",
  isEmpty: function (props) {
    return !props.ourPromotion;
  },
};

MapTo("lebara/components/ourpromotions")(SidePromotion, OurPromotionConfig);