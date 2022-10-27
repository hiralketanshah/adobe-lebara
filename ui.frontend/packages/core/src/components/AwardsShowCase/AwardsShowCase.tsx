import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { AwardsShowCaseProps } from "./types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./styles.css";
import PrevIcon from "../../icons/PrevIcon";
import NextIcon from "../../icons/NextIcon";

const AwardsShowCase: React.FC<AwardsShowCaseProps> = ({ title, awards }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const awardsToRender = awards?.slice(
    awards.length - currentIndex === 1 ? currentIndex - 1 : currentIndex,
    currentIndex + 2
  );
  return (
    <Box
      py={{ base: "30px", lg: "60px" }}
      px="20px"
      bg={{ base: "#F9F9F9", lg: "white" }}
      textAlign="center"
    >
      <Heading
        fontSize={{ base: "22px", lg: "47px" }}
        color="primary.500"
        mb={{ base: "30px", lg: "13px" }}
      >
        {title}
      </Heading>

      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        d={{ base: "flex", lg: "none" }}
      >
        <PrevIcon
          w="17px"
          h="25px"
          justifySelf="flex-start"
          onClick={() =>
            currentIndex <= 0 ? null : setCurrentIndex(currentIndex - 2)
          }
          isDisabled={currentIndex <= 0}
        />
        <Flex gridGap="20px">
          {awardsToRender?.map((t) => (
          <Image src={t.image} title={t.name} alt={t.name} maxW="125px" />
          ))}
        </Flex>
        <NextIcon
          w="17px"
          h="25px"
          onClick={() =>
            currentIndex + 2 >= (awards && awards.length | 0)
              ? null
              : setCurrentIndex(currentIndex + 2)
          }
          isDisabled={currentIndex + 2 >=  (awards && awards.length | 0)}
        />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        d={{ base: "none", lg: "flex" }}
        gridGap="21px"
      >
        {awards?.map((t) => (
          <Image src={t.image} title={t.name} alt={t.name} maxW="125px" />
        ))}
      </Flex>
    </Box>
  );
};

export default AwardsShowCase;
