import React from "react";
import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import { GetAppProps } from "./types";
import color from "../../color";

const AppPromo: React.FC<GetAppProps> = ({
  appTitle,
  backgroundImageMobile,
  backgroundImageDesktop,
  links,
  textDescription,
}) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    gridGap={6}
    pt="51px"
    pb="32px"
  >
    <Heading
      d={{ base: "block", md: "none" }}
      color={color.lebaraChambray[600]}
      fontSize={32}
      fontWeight="bold"
    >
      {appTitle}
    </Heading>

    <Image
      d={{ base: "block", md: "none" }}
      src={backgroundImageMobile}
      alt="Get the App"
    />

    <Box d={{ md: "flex" }} alignItems={{ md: "center" }}>
      <Image
        d={{ base: "none", md: "block" }}
        src={backgroundImageDesktop}
        alt="Get the App"
      />
      <Box>
        <Heading
          d={{ base: "none", md: "block" }}
          ml={{ md: "14px" }}
          mb={{ md: "10px" }}
          color={color.lebaraChambray[600]}
          fontSize={32}
          fontWeight="bold"
        >
          {appTitle}
        </Heading>
        <Text
          w={{ md: "236px" }}
          ml={{ md: "14px" }}
          mb={{ md: "20px" }}
          px="17px"
        >
          {textDescription}
        </Text>
        <Flex justifyContent="center" gridGap={8} pt="32px">
          {links?.map((item) => (
            <a
              href={item?.link}
              style={{ textDecoration: "none", marginRight: "12px" }}
              aria-label="Available on the App Store"
            >
              <img src={item?.label} width="160px" height="100%" />
            </a>
          ))}
        </Flex>
      </Box>
    </Box>
  </Flex>
);

export default AppPromo;
