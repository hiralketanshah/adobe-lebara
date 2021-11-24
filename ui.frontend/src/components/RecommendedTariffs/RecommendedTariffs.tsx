import React from "react";
import { Box, Image, Heading, Button } from "@chakra-ui/react";
import { RecommendedTariffsProps } from "./types";

const RecommendedTariffs: React.FC<RecommendedTariffsProps> = ({
  buttonLabel,
  offers,
}) => (
  <Box
    backgroundColor={{ base: "lightenPrimary.50", md: "white" }}
    padding="20px"
  >
    <Box w="305px">
      <Image src={offers?.recommendedImage} alt="tarrif-bg" borderTopRadius="12px" />
      <Box padding="15px" backgroundColor="white">
        {offers?.planName && <Heading
          fontSize={{ base: "14px", md: "20px" }}
          color="secondary.500"
          my="15px"
        >{offers?.planName}</Heading>}
        {offers?.additionalOffers && <div className={'rich-text'}>
          <Box spacing={3} marginBottom="15px"
            dangerouslySetInnerHTML={{__html : offers?.additionalOffers}}>
          </Box></div>}
        <Button variant="outline" w="100%">
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  </Box>
);
export default RecommendedTariffs;
