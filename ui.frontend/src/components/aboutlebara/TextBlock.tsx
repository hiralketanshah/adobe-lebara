import React from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import { TextBlockProps } from "./types";
import Button from "../Button/Button";
import sanitizeHtml from "sanitize-html";
import sanitizeWhiteList from "../sanitize-html.whitelist";
import desktopBgImage from "./dektopbgimage.png";

const TextBlock: React.FC<TextBlockProps> = ({
  slogan,
  header,
  subHeader,
  buttonText,
  linkURL,
}) => (
  <Box
    padding="16px"
    bg="lightenPrimary.800"
    bgImage={{ md: desktopBgImage }}
    backgroundRepeat="no-repeat"
    backgroundPosition="100%"
    backgroundSize="62%"
    d={{ base: "block", md: "flex" }}
    alignItems={{ md: "center" }}
    justifyContent={{ md: "space-around" }}
  >
    <Box>
      {slogan && (
        <Text color="lebaraBlue.500" fontSize={16} fontWeight="bold">
          {slogan}
        </Text>
      )}
      <Heading as="h1" fontSize={38} fontWeight="semibold" color="white">
        {header}
      </Heading>

      {subHeader && (
        <Box
          color="grey.600"
          fontSize={16}
          mt="12px"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(subHeader, sanitizeWhiteList),
          }}
        />
      )}
      {buttonText && (
        <Link href={linkURL} style={{ textDecoration: "none" }}>
          <Button fontSize={14} width={176} px="32px" mt="23px">
            {buttonText}
          </Button>
        </Link>
      )}
    </Box>
  </Box>
);

export default TextBlock;
