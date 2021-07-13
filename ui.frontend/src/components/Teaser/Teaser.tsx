import React from "react";
import sanitizeHtml from "sanitize-html";
import sanitizeWhiteList from "../sanitize-html.whitelist";
import { Box, Text, Heading } from "@chakra-ui/react";

import { TeaserV1Model } from "@adobe/aem-core-components-react-base/dist/authoring/teaser/v1/TeaserV1";

const Teaser: React.FC<TeaserV1Model> = ({
  title,
  description,
  pretitle,
  imagePath,
}) => (
  <Box w="100%" p="20px" bgImage={imagePath} bgSize="cover">
    <Box d="flex" flexDir="column">
      {pretitle && (
        <Text
          fontSize="14px"
          lineHeight="tall"
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="0.1em"
          color="white"
        >
          {pretitle}
        </Text>
      )}
      <Heading
        color="white"
        as="h1"
        letterSpacing="0px"
        fontSize="38px"
        fontWeight="bold"
        pb="15px"
        pt="8px"
        lineHeight="48px"
        textAlign="left"
      >
        {title}
      </Heading>

      {description && (
        <Text fontSize="16px" lineHeight="tall" color="white">
          {description}
        </Text>
      )}
    </Box>
  </Box>
);

export default Teaser;

Teaser.defaultProps = {
  title: "Title",
  description: "description",
  pretitle: "pretitle",
};
