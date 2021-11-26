import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { AboutLebaraProps } from "./types";
import TextBlock from "../TextBlock/TextBlock";
import { Image } from "../Image/Image";

const TextFeature: React.FC<AboutLebaraProps> = ({
  pretitle,
  title,
  actionsEnabled,
  actions,
  description,
  imagePath,
  linkURL,
  buttonStyle,
  imageAlign,
  buttonClassName,
}) => (
    <>
      {imageAlign && (imageAlign === '' || imageAlign === 'left') && (<Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex w={{ md: "50%" }} justifyContent="center">
          {imagePath && (
            <Image src={imagePath}  w={{lg: 398 }} alt="About lebara" />
          )}
        </Flex>
        <Spacer />
        <Flex
          flexDirection="column"
        >
          <TextBlock            
            buttonText={actionsEnabled ? actions && actions[0]?.title : ""}
            linkURL={linkURL ? linkURL : actionsEnabled ? actions && actions[0]?.url : "#"}
            slogan={pretitle}
            header={title}
            subHeader={description}
            buttonStyle={buttonStyle}
          />
        </Flex>
      </Flex>)}
      
      {imageAlign && (imageAlign === '' || imageAlign === 'right') && (<Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDirection="column">
          <TextBlock
            buttonText={actionsEnabled ? actions && actions[0]?.title : ""}
            linkURL={linkURL ? linkURL : actionsEnabled ? actions && actions[0]?.url : "#"}
            slogan={pretitle}
            header={title}
            subHeader={description}
            buttonStyle={buttonStyle}
          />
        </Flex>
        <Spacer />
        <Flex w={{ md: "50%" }} justifyContent="center">
          {imagePath && (
            <Image src={imagePath}  w={{lg: 398 }} alt="About lebara" />
          )}
        </Flex>
      </Flex>
      
      )}

    </>
  );

export default TextFeature;
