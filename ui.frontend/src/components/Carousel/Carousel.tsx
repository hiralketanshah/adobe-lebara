// @ts-nocheck
import React, { useState } from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import { CarouselProps } from "./types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import Aboutlebara from "../aboutlebara/aboutlebara";
import CarouselPagingCircle from "./CarouselPagingCircle";

const Carousel: React.FC<CarouselProps> = ({ cqItems, id }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    customPaging(index: number) {
      return (
        <CarouselPagingCircle
          w="14px"
          height="14px"
          isActive={index === currentSlide}
        />
      );
    },
  };
  return (
    <Box bg={currentSlide && cqItems && cqItems[Object.keys(cqItems)[currentSlide]]?.backgroundColor? cqItems[Object.keys(cqItems)[currentSlide]].backgroundColor :"lebaraBlue.500"} pb={{ base: "40px", lg: "70px" }}>
      <Slider {...settings} beforeChange={(prev, next) => setCurrentSlide(next)}>
        {cqItems && Object.entries(cqItems).map(([_, value]) => (
          <Aboutlebara {...value} noBgColor={true} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
