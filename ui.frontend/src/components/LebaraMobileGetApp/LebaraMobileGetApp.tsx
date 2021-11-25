import {
  Box,
  Text,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Flex,
  IconButton,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/all";
import { LebaraMobileAppProps } from "./types";
import AvailableOnTheAppstore from "../../icons/AvailableOnTheAppstoreIcon";
import GetItOnGooglePlayIcon from "../../icons/GetItOnGooglePlayIcon";
import LebaraText from "../LebaraText/LebaraText";

const LebaraMobileGetApp: React.FC<LebaraMobileAppProps> = ({
  appTitle,
  textDescription,
  links,
  textCol1,
  textCol2,
  getAppLabel,
  backgroundImageDesktop,
}) => (
  <>
    <Box
      className="get-app-comp-wrapper"
      backgroundImage={backgroundImageDesktop}
      bgRepeat="no-repeat"
      bgSize="100%"
      bgPosition="center"
      width="auto"
    >
      <Box>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box width={{ base: "initial", md: "50%" }}>
            <Box>
              <Box p="30px" pl={{ base: "initial", md: "30%" }} color="white">
                {appTitle && <LebaraText
                  type="h4"
                  fontSize="22px"
                  lineHeight="14px"
                  letterSpacing="0.25px"
                  fontWeight="bold"
                >{appTitle}
                </LebaraText>}
                {textDescription && <Text
                  mt="10px"
                  fontSize="14px"
                  lineHeight="16px"
                  letterSpacing="0.15px"
                  fontWeight="500"
                  dangerouslySetInnerHTML={{__html: textDescription}}
                />}
                <Box mt="15px">
                  <SimpleGrid columns={2} spacing={{ base: 1, md: 5 }}>
                    <Box>
                      <List spacing={1}>
                        {textCol1?.map((textValue, idx) => (<ListItem key={`text-col1-listitem-${idx}`}>
                          <ListIcon
                            as={IoIosCheckmarkCircleOutline}
                            color="white"
                          />
                          <Text
                            fontSize={{ base: "12px", md: "14px" }}
                            lineHeight="18px"
                            letterSpacing="0.15px"
                            fontWeight="bold"
                            display="inline-block"
                          >
                            {textValue}
                          </Text>
                        </ListItem>))}
                      </List>
                    </Box>
                    <Box>
                      <List spacing={1}>
                      {textCol2?.map((textValue, idx) => (<ListItem key={`text-col1-listitem-${idx}`}>
                          <ListIcon
                            as={IoIosCheckmarkCircleOutline}
                            color="white"
                          />
                          <Text
                            fontSize={{ base: "12px", md: "14px" }}
                            lineHeight="18px"
                            letterSpacing="0.15px"
                            fontWeight="bold"
                            display="inline-block"
                          >
                            {textValue}
                          </Text>
                        </ListItem>))}
                      </List>
                    </Box>
                  </SimpleGrid>
                </Box>
                <Box mt="20px">
                  {getAppLabel && <Text
                    fontSize={14}
                    fontWeight="700"
                    textTransform="uppercase"
                    lineHeight="20px"
                  >
                    {getAppLabel}
                  </Text>}

                  {links?.length && <Flex justifyContent="flex-start" mt="10px">
                    <IconButton
                      as={Link}
                      href={(links[0] && links[0].link) || "/"}
                      icon={
                        <AvailableOnTheAppstore width="160px" height="100%" />
                      }
                      aria-label="Available on the App Store"
                      sx={{
                        svg: {
                          width: "156px",
                          height: "46px",
                        },
                      }}
                    />
                    <IconButton
                      as={Link}
                      href={(links[1] && links[1].link) || "/"}
                      icon={
                        <GetItOnGooglePlayIcon width="160px" height="100%" />
                      }
                      aria-label="Get it on google Play"
                      ml="5px"
                      sx={{
                        svg: {
                          width: "156px",
                          height: "46px",
                        },
                      }}
                    />
                  </Flex>}
                  
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width={{ base: "initial", md: "50%" }}>
            <></>
          </Box>
        </Flex>
      </Box>
    </Box>
  </>
);

export default LebaraMobileGetApp;
