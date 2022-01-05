// @ts-nocheck
import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { TextBlockProps } from "./types";
import Button from "../Button/Button";
import sanitizeHtml from "sanitize-html";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
// import sanitizeWhiteList from "../sanitize-html.whitelist";
// import List from "../List/List";
// import TickInCircle from "../../icons/TickInCircle";
// import Trustpilot from "../Trustpilot/Trustpilot";

const TextBlock: React.FC<TextBlockProps> = ({
  slogan,
  header,
  subHeader,
  buttonText,
  // imagePath,
  linkURL,
  buttonStyle,
  buttonCustomMakeup,
}) => {
const history = useHistory();
return (
    <Box
      px={{ base: "20px" }}
      py={{ base: "30px" }}
      d={{ base: "block", lg: "flex" }}
      alignItems={{ lg: "center" }}
      justifyContent={{ lg: "space-around" }}
    >
      <Box>
        {slogan && (
          <Text color="lightenPrimary.500" fontSize={16} fontWeight="bold">
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
        <Box>
          {subHeader && (
            <Text
            color="grey.600"
            fontSize={16}
            mt={{ base: "10px", lg: "20px" }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(subHeader)
            }}
            />
          )}
          {/* {sanitizeWhiteList && (<Box mt={26}
              textColor="white"
              dangerouslySetInnerHTML={{
                __html: sanitizeWhiteList,
              }}
          />)} */}
        </Box>
        {buttonText && (
          <Button
            width={{ base: "100%" }}
            fontSize={14}
            px="32px"
            mt={{ base: "20px", lg: "40px" }}
            maxW={{ lg: "306px" }}
            variant={buttonStyle? buttonStyle : "outline"}
            onClick={() => history.push(linkURL)}
            backgroundColor={buttonCustomMakeup?.buttonBackgroundColor || "inherit"}
            color={buttonCustomMakeup?.buttonTextColor || "white"}
            _hover={{ backgroundColor: buttonCustomMakeup?.buttonHoverBgColor || "inherit", 
              color: buttonCustomMakeup?.buttonHoverTextColor || "white" }}
          >
            {buttonText}
          </Button>
        )}
      </Box>

      {/* <Box d={{ base: "none", md: "block" }}>
        {sanitizeWhiteList && (
          <Box>
            {sanitizeWhiteList && (<Box mt={26}
                textColor="white"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(sanitizeWhiteList),
                }}
            />)}
             <Trustpilot ratingValue={4} totalRatings={9814} totalStars={5} /> 
          </Box>
        )}
      </Box> */}
    </Box>
  );
}
export default TextBlock;