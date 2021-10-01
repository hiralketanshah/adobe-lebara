import { MapTo } from "@adobe/aem-react-editable-components";
import Carousel from "./Carousel";

const CarouselConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(Carousel, CarouselConfig);
