import React from "react";
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";
import AppPromo from "./GetAppPromo";

import { GetAppProps } from "./types";

const GetApp: React.FC<GetAppProps> = ({
  appTitle,
  backgroundImageMobile,
  backgroundImageDesktop,
  links,
  textDescription,
  show,
}) => {
  return (
    <>
      {show ? (
        <AppPromo
          appTitle={appTitle}
          backgroundImageMobile={backgroundImageMobile}
          backgroundImageDesktop={backgroundImageDesktop}
          links={links}
          textDescription={textDescription}
        />
      ) : (
        <Box px="10px">
          <Text
            fontSize={22}
            color="lebaraChambray.600"
            fontWeight="bold"
            textTransform="uppercase"
            mt="30px"
            mb="16px"
          >
            {appTitle}
          </Text>
          <Flex justifyContent="space-between">
            {links?.map((item) => (
              <Link href={item?.link} style={{ textDecoration: "none" }}>
                <Image
                  src={item?.label}
                  aria-label="Available on the App Store"
                  width="156"
                  height="46"
                />
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};
export default GetApp;
