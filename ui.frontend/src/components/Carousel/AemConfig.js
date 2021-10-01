import { MapTo } from "@adobe/aem-react-editable-components";
import Carousel from "./Carousel";

const CarouselConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.cqItems
    },
};

MapTo("lebara/components/carousel")(Carousel, CarouselConfig);
