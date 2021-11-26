import React from "react";
import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { HowItWorksProps } from "./types";

const HowItWorks: React.FC<HowItWorksProps> = ({
  title,
  description,
  uspList
}) => {
  const blocks = uspList?.length ? [...uspList] : [];

  return (
    <Box padding="20px" textAlign={{ base: "center", md: "left" }}>
      {title && <Heading as="h6" color="primary.500" marginBottom="10px">
        {title}
      </Heading>}
      {description && <Text fontSize={{ base: "14px", md: "16px" }}>
        {description}
      </Text>}
      <Box
        marginTop="30px"
        display={{ base: "block", md: "flex" }}
        justifyContent="space-between"
      >
        {blocks?.map((block, idx) => (
          <Box
            key={`hitw-key-${idx}`}
            textAlign="center"
            marginBottom={blocks?.length-1 === idx ? '' : '25px'}
            w={{ base: "auto", md: "26%" }}
          >
            <Image
              src={block?.icon}
              alt={`${block?.title}-icon`}
              margin={{ base: "10px auto", md: "15px auto" }}
            />
            {block?.title && <Heading color="primary.500" fontSize={{ base: "24px", md: "32px" }}>
              {block?.title}
            </Heading>}
            {block?.body && <Text
              fontSize={{ base: "14px", md: "16px" }}
              w={{ base: "auto", md: "70%" }}
              margin={{ base: "0px", md: "auto" }}
            >
              {block?.body}
            </Text>}
          </Box>
        ))}
      </Box>
    </Box>
);
}

export default HowItWorks;
