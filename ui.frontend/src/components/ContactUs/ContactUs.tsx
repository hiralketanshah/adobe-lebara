import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Text, Flex } from "@chakra-ui/react";
import Button from "../Button/Button";
import { ContactUsProps } from "./types";

const ContactUs: React.FC<ContactUsProps> = ({
  heading,
  description,
  supportList,
}) => {
  const history = useHistory();

  const headingStyle = {
    fontFamily: "Roboto",
    fontWeight: { base: "500", lg: "bold" },
    fontSize: { base: "24px", lg: "32px" },
    lineHeight: { base: "30px", lg: "40px" },
    letterSpacing: "0.25px",
    color: "primary.500",
  };
  const boxStyle = {
    bgColor: "grey.50",
    paddingTop: { base: "31px", lg: "40px" },
    paddingLeft: { base: "22px", lg: "23px" },
    paddingRight: { base: "21px", lg: "23px" },
    width: { base: "100%" },
    borderRadius: "4px",
  };
  const contactBoxTextStyle = {
    fontFamily: "Roboto",
    fontSize: { base: "14px", lg: "16px" },
    lineHeight: { base: "20px", lg: "23px" },
    color: "#00000",
  };

  return (
    <Box
      py={{ base: "30px", lg: "60px" }}
      paddingLeft={{ base: "20px", lg: "81px" }}
      paddingRight="20px"
    >
      {heading && <Text
        fontFamily="Chiswick Grotesque Lebara"
        fontWeight="bold"
        fontSize="32px"
        lineHeight="40px"
        letterSpacing="0.25px"
        color="primary.500"
      >
        {heading}
      </Text>}
      {description && <Text
        fontFamily="Roboto"
        fontSize={{ base: "14px", lg: "16px" }}
        lineHeight={{ base: "20px", lg: "23px" }}
        mt="10px"
      >
        {description}
      </Text>}
      {supportList && supportList?.length !== 0 && <Flex
        mt={{ base: "10px", lg: "50px" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        {supportList?.map((item, idx) => (<Box {...boxStyle} 
          key={`support-list-${idx}`}
          mt="10px" 
          ml={{ lg: idx > 0 ? "21px" : "" }} 
          >
            <Flex alignItems="center">
              <Text {...headingStyle}>{item?.title}</Text>
              <img src={item?.icon} alt="chat" style={{ marginLeft: "auto" }} />
            </Flex>
            <Text {...contactBoxTextStyle} mt={{ base: "9px", lg: "9px" }} 
              className="rich-text--support"
              dangerouslySetInnerHTML={
                item?.body ? { __html: item?.body } : undefined
               } />
            <Button
              w="100%"
              mt={{ base: "20px", lg: idx === 0 ? "60px" : "25px" }}
              mb={{ base: "30px", lg: "40px" }}
              onClick={() => history.push(item?.ctaLink || "/")}
            >
              {item?.ctaLinkLabel}
            </Button>
          </Box>)
        )}
      </Flex>}
    </Box>
  );
};

export default ContactUs;
