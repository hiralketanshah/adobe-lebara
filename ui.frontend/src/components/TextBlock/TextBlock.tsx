import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { TextBlockProps } from "./types";
import Button from "../Button/Button";
import sanitizeHtml from "sanitize-html";
import sanitizeWhiteList from "../sanitize-html.whitelist";

const TextBlock: React.FC<TextBlockProps> = ({
  slogan,
  header,
  subHeader,
  buttonText,
  // imagePath,
  linkURL,
  buttonStyle
}) => (
    <Box
      px={{ base: "20px" }}
      py={{ base: "30px" }}
      d={{ base: "block", lg: "flex" }}
      alignItems={{ lg: "center" }}
      justifyContent={{ lg: "space-around" }}
    >
      <Box>
        {slogan && (
          <Text color="white" fontSize={16} fontWeight="bold">
            {slogan}
          </Text>
        )}
        <Heading
          as="h1"
          fontSize={{ base: "32px", lg: "47px" }}
          fontWeight="semibold"
          color="white"
        >
          {header}
        </Heading>
        {subHeader && (
          <Box
            fontSize={16}
            mt="12px"
            textColor="white"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(subHeader, sanitizeWhiteList),
            }}
          />
        )}
        {buttonText && (
          <Button
            width={{ base: "100%" }}
            fontSize={14}
            px="32px"
            mt={{ base: "20px", lg: "40px" }}
            color="white"
            maxW={{ lg: "306px" }}
            variant={buttonStyle? buttonStyle : "outline"}
            onClick={() => window.open(linkURL ,"_self")}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );

export default TextBlock;