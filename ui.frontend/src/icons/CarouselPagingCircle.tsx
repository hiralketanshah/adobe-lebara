import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface CarouselPagingCircleProps extends IconProps {
  isActive?: boolean;
}
const CarouselPagingCircle = ({
  isActive,
  ...props
}: CarouselPagingCircleProps) => (
  <Icon viewBox="0 0 14 14" {...props}>
    <circle
      cx="7"
      cy="7"
      r="6.5"
      fill={isActive ? "white" : "none"}
      stroke={isActive ? "none" : "white"}
    />
  </Icon>
);

export default CarouselPagingCircle;
