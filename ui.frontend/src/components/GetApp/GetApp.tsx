import React from "react";
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/all";
import AvailableOnTheAppstore from "../../icons/AvailableOnTheAppstoreIcon";
import GetItOnGooglePlayIcon from "../../icons/GetItOnGooglePlayIcon";
import LebaraText from "../LebaraText/LebaraText";
import AppPromo from "./GetAppPromo";

import { GetAppProps } from "./types";

const GetApp: React.FC<GetAppProps> = ({
  appTitle,
  show,
  backgroundImageMobile,
  backgroundImageDesktop,
  textDescription,
  links,
  textCol1,
  textCol2,
  getAppLabel,
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
            color="lightenPrimary.600"
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
