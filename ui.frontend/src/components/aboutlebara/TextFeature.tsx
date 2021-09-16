import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { AboutLebaraProps } from "./types";
import TextBlock from "./TextBlock";
import { Image } from "../Image/Image";

const TextFeature: React.FC<AboutLebaraProps> = ({
  pretitle,
  title,
  actionsEnabled,
  actions,
  description,
  isFullWidthButton,
  imagePath
}) => (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <Flex w={{ md: "50%" }} justifyContent="center">
        {imagePath && (
          <Image src={imagePath} height="100%" alt="About lebara" />
        )}
      </Flex>
      <Spacer />
      <Flex
        maxW={{ lg: "50%" }}
        flexDirection="column"
        backgroundColor="primary.500"
      >
        <TextBlock
          buttonText={actionsEnabled ? actions && actions[0]?.title : ""}
          linkURL={actionsEnabled ? actions && actions[0]?.url : "#"}
          slogan={pretitle}
          header={title}
          subHeader={description}
        />
      </Flex>
    </Flex>
  );

export default TextFeature;
