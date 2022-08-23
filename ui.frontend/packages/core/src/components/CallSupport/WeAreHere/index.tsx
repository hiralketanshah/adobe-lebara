import React from "react";
import Button from "../../Button/Button";

import { Flex, Text, Box } from "@chakra-ui/react";
import { useHistory } from "@lebara/core/hooks/useHistory";
import { WeAreHereProps } from "../types";

const WeAreHere: React.FC<WeAreHereProps> = ({
  heading,
  description,
  ctaLiveChatLabel,
  ctaLiveChatUrl,
  separatorOrText,
}) => {
  const history = useHistory();
  return (<>

    {separatorOrText && <Flex
        alignItems={{ base: "flex-start", lg: "center" }}
        justifyContent={{ base: "flex-start", lg: "center" }}
        direction="column"
        bg="lightenPrimary.50"
      >
        <Text
          mt="52px"
          mb="52px"
          fontWeight="500"
          fontSize="24px"
          lineHeight="28px"
          color="primary.500"
          display={{ base: "none", lg: "block" }}
        >
          {" "}{separatorOrText || "OR"}{" "}
      </Text>
    </Flex>}

    <Box
        pb={{ base: "0px", lg: "98px" }}
        bg="lightenPrimary.50"
        width={{ base: "100%" }}
        mb="9px"
      >
        <Flex
          alignItems={{ base: "flex-start", lg: "center" }}
          justifyContent={{ base: "flex-start", lg: "center" }}
          direction="column"
        >
          <Box
            bg="white"
            px="20px"
            py="30px"
            w={{ base: "100%", lg: "846px" }}
            borderRadius={{ base: "0px", lg: "8px" }}
            mt={{ base: "44px", lg: "35px" }}
            textAlign={{ lg: "center" }}
          >
            {heading && <Text
              fontWeight="bold"
              letterSpacing="-0.01em"
              fontSize="20px"
              lineHeight="40px"
            >
              {heading}
            </Text>}

            {description && <Text letterSpacing="0.25px" fontSize="14px" lineHeight="20px"
              className="rich-text"
              dangerouslySetInnerHTML={{ __html : description }} />}

            <Button
              mt={{ base: "18px", lg: "9px" }}
              w={{ base: "100%", lg: "320px" }}
              bg="cyan"
              onClick={() => history.push(ctaLiveChatUrl || "/")}
              >
              {ctaLiveChatLabel || "Start Live Chat"}
            </Button>
          </Box>
      </Flex>
    </Box>
  </>);

}

export default WeAreHere;
