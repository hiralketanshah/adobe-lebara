// @ts-nocheck
import React from "react";
import { Flex, Heading, Image, Box, Link } from "@chakra-ui/react";
import { GetAppProps } from "./types";
import sanitizeHtml from "sanitize-html";
import sanitizeWhiteList from "../sanitize-html.whitelist";

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
      color="lebaraChambray.600"
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
          color="lebaraChambray.600"
          fontSize={32}
          fontWeight="bold"
        >
          {appTitle}
        </Heading>
        {textDescription && (
          <Box
            w={{ md: "236px" }}
            ml={{ md: "14px" }}
            mb={{ md: "20px" }}
            px="17px"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(textDescription, sanitizeWhiteList),
            }}
          />
        )}
        <Flex justifyContent="center" gridGap={8} pt="32px">
          {links?.map((item) => (
            <Link href={item?.link} style={{ textDecoration: "none" }}>
              <Image
                src={item?.label}
                aria-label="Available on the App Store"
                width="160"
                height="100%"
              />
            </Link>
          ))}
        </Flex>
      </Box>
    </Box>
  </Flex>
);

export default AppPromo;
