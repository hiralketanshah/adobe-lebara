import React from "react";
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { HelpSPAProps } from "./types";

const HelpSinglePageAnswer: React.FC<HelpSPAProps> = ({
  bcBaseText,
  bcCurrentText,
  faqsSPAHeading,
  faqsSPA,
}) => (
  <Box>
    <Breadcrumb
      ml={{ base: "0px", lg: "15px" }}
      mt="21px"
      {...{
        separator: (
          <Box mx="9px" color="primary.500">
            {">"}
          </Box>
        ),
        fontSize: "sm",
        spacing: 0,
        children: [
          <BreadcrumbItem>
            <BreadcrumbLink href={(GC.journeyPages[C.FAQ]  || '/')} color="primary.500" fontWeight="500">
              {bcBaseText}
            </BreadcrumbLink>
          </BreadcrumbItem>,
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="secondary.500" fontWeight="500">
              {bcCurrentText}
            </BreadcrumbLink>
          </BreadcrumbItem>,
        ],
      }}
    />
    <Text
      fontWeight="500"
      fontSize="24px"
      lineHeight="30px"
      letterSpacing="0.25px"
      mt="30px"
      ml={{ base: "0px", lg: "15px" }}
    >{faqsSPAHeading}</Text>
    <Box mt="30px" px="15px" py="20px" borderRadius="8px" bgColor="white">
      {faqsSPA?.map((faq, idx) => (<React.Fragment key={`faq-spa-${idx}`}>
          <Text
            fontWeight="500"
            fontSize="22px"
            lineHeight="26px"
            letterSpacing="0.25px"
            mb="15px"
          >
            {faq.title}{" "}
          </Text>
          <Text fontSize="14px" lineHeight="20px" letterSpacing="0.25px" mb="15px">
            {faq.description}
          </Text>
        </React.Fragment>
      ))}
    </Box>
  </Box>
);

export default HelpSinglePageAnswer;
