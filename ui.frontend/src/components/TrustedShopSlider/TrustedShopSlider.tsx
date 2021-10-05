import React, { createRef, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import moment from "moment";
import { TrustedShopSliderProps } from "./types";
import TrustedShopReview from "../TrustedShopReview/TrustedShopReview";
import ReviewSliderPrevIcon from "../../icons/ReviewSliderPrevIcon";
import ReviewSliderNextIcon from "../../icons/ReviewSliderNextIcon";
import "./style.css";
import { Image } from "../Image/Image";
import TrustedShopsLogo from "./trusted-shop-logo.png";
import TrustedShopsStarIcon from "../../icons/TrustedShopsStarIcon";
import trustedShopsAxios from "../../utils/trustedShopsAxios";

const TrustedShopSlider: React.FC<TrustedShopSliderProps> = ({title}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slider = createRef<any>();
  const [reviews, setReviews] = useState([]);
  const [trustedShopInfo, setTrustedShopInfo] = React.useState<{
    reviewsCount: number;
    markDescription: string;
    stars: number;
  }>();

  const slidesToShow = useBreakpointValue({ base: 1, lg: 3 }) || 1;

  React.useEffect(() => {
    trustedShopsAxios
      .get("/shops/XC8F2118BD80057577BC028C8CB06B635/reviews.json")
      .then((res) => {
        setReviews(
          (res.data.response?.data?.shop?.reviews || []).map((t: any) => ({
            date: moment(t.creationDate).format("DD MMMM YYYY"),
            description: t.comment,
            stars: Number(t.mark),
          }))
        );
      });
    trustedShopsAxios
      .get("/shops/XC8F2118BD80057577BC028C8CB06B635/quality.json")
      .then((res) => {
        const data =
          res.data.response?.data?.shop?.qualityIndicators.reviewIndicator
            .reviewIndicatorPeriodSummary.reviewIndicatorPeriods[0];
        setTrustedShopInfo({
          stars: data.overallMark,
          markDescription: data.overallMarkDescription,
          reviewsCount: data.activeReviewCount,
        });
      });
  }, []);
  if (!trustedShopInfo) return null;

  const settings = {
    className: "trusted-shop-slider",
    arrows: false,
    infinite: false,
    slidesToShow,
    initialSlide: 1,
    adaptiveHeight: true,
    speed: 500,
  };

  const isPrevDisabled = currentSlide <= 0;
  const isNextDisabled = slidesToShow + currentSlide >= reviews.length;
  const starsPercentage = trustedShopInfo.stars % 1;

  return (
    <Box
      pt={{ base: "23px", lg: "63px" }}
      pb={{ base: "23px", lg: "49px" }}
      px={{ base: "23px", lg: "80px" }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Heading
          pb="37px"
          color="primary.500"
          textAlign="center"
          ml={{ base: "0", lg: "auto" }}
        >
          {title}
        </Heading>
        <Flex ml="auto" d={{ base: "none", lg: "flex" }}>
          <IconButton
            aria-label="prev"
            icon={<ReviewSliderPrevIcon />}
            variant="ghost"
            disabled={isPrevDisabled}
            onClick={() => slider.current.slickPrev()}
          />
          <IconButton
            aria-label="next"
            icon={<ReviewSliderNextIcon />}
            variant="ghost"
            disabled={isNextDisabled}
            onClick={() => slider.current.slickNext()}
          />
        </Flex>
      </Flex>
      <Slider
        {...settings}
        afterChange={(slide) => setCurrentSlide(slide)}
        ref={slider}
      >
        {reviews.map((t) => (
          <TrustedShopReview {...t} />
        ))}
      </Slider>

      <Flex alignItems="center" flexDirection="column" mt="20px">
        <Flex alignItems="center">
          <Image src={TrustedShopsLogo} w="32px" mr="9px" />
          {[...Array(Math.trunc(trustedShopInfo.stars)).keys()].map((t) => (
            <TrustedShopsStarIcon key={t} />
          ))}
          {starsPercentage > 0 && (
            <TrustedShopsStarIcon percentage={starsPercentage} />
          )}
          <Flex ml="9px">
            <Text fontWeight="bold">{trustedShopInfo.markDescription}</Text>
            <Text d="inline" paddingLeft="8px">
              {trustedShopInfo.stars}/5.00 of ({trustedShopInfo.reviewsCount})
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TrustedShopSlider;
