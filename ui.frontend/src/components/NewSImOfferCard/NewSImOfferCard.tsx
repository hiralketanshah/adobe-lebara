import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { NewSImOfferCard } from "./types";
// import LebaraNewSim from "../../assets/images/lebara-new-sim.svg";
// import LebaraSimCard from "../../assets/images/lebara-sim.svg";

const NewSIMOfferCard: React.FC<NewSImOfferCard> = ({imagePath, simImage, imageText}) => (
  <Box
    w={400}
    h={220}
    textAlign="center"
    backgroundColor="primary.500"
    p="30px"
  >
    <Box display="flex">
      <Box textAlign="left" w="50%">
        {imageText && (
          <Text
            fontFamily="Chiswick Grotesque Lebara"
            fontWeight="700"
            fontSize="30px"
            letterSpacing="0.25px"
            color="white"
            lineHeight="31px"
          >
            {imageText}
          </Text>
        )}
        {simImage && (
          <Box mt="18px">
            <img src={simImage} alt="LebaraNewSim" />
          </Box>
        )}
      </Box>
      {imagePath && (
        <Box position="absolute" top="10px" left="215px">
          <img src={imagePath} alt="LebaraSimImage" />
        </Box>
      )}
    </Box>
  </Box>
);

export default NewSIMOfferCard;
