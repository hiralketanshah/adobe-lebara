import React from "react";
import { Box, Image, Heading, Button } from "@chakra-ui/react";
import { RecommendedTariffsProps } from "./types";
import { useHistory } from "react-router-dom";

const RecommendedTariffs: React.FC<RecommendedTariffsProps> = ({
  buttonLabel,
  offers,
}) => {
  const history = useHistory();
  return (<Box
    backgroundColor={{ base: "lightenPrimary.50", md: "white" }}
    padding="20px"
    className="recommended-tariffs-blocks"
    display={{base: "block", md: "flex", lg: "flex"}}
    justifyContent={{base: "space-around", md: "space-evenly"}}
    >
      {offers?.map((offer: any, idx:number) => (
        <Box w={{base: "100%", md: "305px"}}
          key={`rec-key-${idx}`}
          mb={{base: "20px", md: "0"}}>
          <Image src={offer?.recommendedImage} alt="tarrif-bg" borderTopRadius="12px" />
          <Box padding="15px" backgroundColor="white">
            {offer?.planName && <Heading
              fontSize={{ base: "14px", md: "20px" }}
              color="secondary.500"
              my="15px"
            >{offer?.planName}</Heading>}
            {offer?.additionalOffers && <div className={'rich-text'}>
              <Box spacing={3} marginBottom="15px"
                dangerouslySetInnerHTML={{__html : offer?.additionalOffers}}>
              </Box></div>}
            <Button
              onClick={() => {
                history.push(offer?.recommendedURL || '/');
              }}
              variant="outline" w="100%">
              {buttonLabel}
            </Button>
          </Box>
      </Box>))
    }
  </Box>
  );
}
export default RecommendedTariffs;
