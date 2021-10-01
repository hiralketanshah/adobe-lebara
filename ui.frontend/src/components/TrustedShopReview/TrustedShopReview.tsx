import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { TrustedShopReviewProps } from "./types";
import TrustedShopsStarIcon from "../../icons/TrustedShopsStarIcon";

const TrustedShopReview: React.FC<TrustedShopReviewProps> = ({
  description,
  date,
  stars,
}) => {
  const starsPercentage = stars % 1;
  return (
    <Flex flexDirection="column" bg="grey.50" p="30px">
      <Flex gridGap="1.66px">
        {[...Array(Math.trunc(stars)).keys()].map((t) => (
          <TrustedShopsStarIcon key={t} />
        ))}
        {starsPercentage > 0 && (
          <TrustedShopsStarIcon percentage={starsPercentage} />
        )}
      </Flex>
      <Text
        fontSize={16}
        mt="20px"
        lineHeight="23px"
        display="-webkit-box"
        textOverflow="ellipsis"
        noOfLines={3}
        minH="70px  "
      >
        {description}
      </Text>
      <Text
        mt="17px"
        color="grey.300"
        fontSize="14px"
        letterSpacing="0.25px"
        lineHeight="20px"
      >
        {date}
      </Text>
    </Flex>
  );
};

export default TrustedShopReview;
