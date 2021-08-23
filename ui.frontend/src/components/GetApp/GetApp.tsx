import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import color from "../../color";
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
            color={color.lebaraChambray[600]}
            fontWeight="bold"
            textTransform="uppercase"
            mt="30px"
            mb="16px"
          >
            {appTitle}
          </Text>
          <Flex>
            {links?.map((item) => (
              <a
                href={item?.link}
                style={{ textDecoration: "none", marginRight: "60px" }}
                aria-label="Available on the App Store"
              >
                <img src={item?.label} width="156px" height="46px" />
              </a>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default GetApp;
