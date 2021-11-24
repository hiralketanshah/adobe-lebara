import React from "react";
import { Box, Image, Heading, List, ListItem, Button } from "@chakra-ui/react";
import TarriffBg from "../../assets/de-images/de-recommend-tariffbg.svg";
import InfoCheckIcon from "../../assets/de-images/de-check.png";
import { RecommendedTariffsProps } from "./types";

const RecommendedTariffs: React.FC<RecommendedTariffsProps> = ({
  heading,
  list,
  ctaButtonLabel,
  ctaButtonURL
}) => (
  <Box
    backgroundColor={{ base: "lightenPrimary.50", md: "white" }}
    padding="20px"
  >
    <Box w="305px">
      <Image src={TarriffBg} alt="tarrif-bg" borderTopRadius="12px" />
      <Box padding="15px" backgroundColor="white">
        {heading && <Heading
          fontSize={{ base: "14px", md: "20px" }}
          color="secondary.500"
          my="15px"
        >{heading}</Heading>}
        <List spacing={3} marginBottom="15px">
          {/* To Question: icon will come from inline with component or aem authoring */}
          <ListItem display="flex" alignItems="center">
            <Image src={InfoCheckIcon} marginRight="14px" height="18px" />
            15 GB + Allnet Flat
          </ListItem>
          {list?.map((item, idx) => <ListItem display="flex" alignItems="center">
            <Image src={item?.icon || InfoCheckIcon} marginRight="14px" height="18px" />
              {item?.text}
          </ListItem>)}
        </List>
        {/* To Question: CTA URL or custom event handler ? */}
        <Button variant="outline" w="100%">
          {ctaButtonLabel}
        </Button>
      </Box>
    </Box>
  </Box>
);
export default RecommendedTariffs;
