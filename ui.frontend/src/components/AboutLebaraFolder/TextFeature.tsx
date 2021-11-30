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
  isFullWidthButton,
  buttonBackgroundColor,
  buttonTextColor,
  buttonHoverBgColor,
  buttonHoverTextColor,
}) => {
  const buttonCustomMakeup = {
    buttonBackgroundColor: (buttonBackgroundColor || ""),
    buttonTextColor: (buttonTextColor || ""),
    buttonHoverBgColor: (buttonHoverBgColor || ""),
    buttonHoverTextColor: (buttonHoverTextColor || ""),
  }

  return (
    <>
      {(!imageAlign || (imageAlign === '' || imageAlign === 'left')) && (<Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex maxW={{ lg: "40%" }} justifyContent="center">
          {imagePath && (
            <Image 
              src={imagePath}
              w={{lg: 398 }}
              height="100%"
              alt={title} 
              mb={{ base: "-28%", lg: 0 }}
            />
          )}
        </Flex>
        <Spacer />
        <Flex
          maxW={{ lg: "50%" }}
          flexDirection="column"
          >
          <TextBlock
            buttonText={actionsEnabled ? actions && actions[0]?.title : ""}
            isFullWidthButton={isFullWidthButton}
            linkURL={linkURL ? linkURL : actionsEnabled ? actions && actions[0]?.url : "#"}
            slogan={pretitle}
            header={title}
            subHeader={description}
            buttonStyle={buttonStyle}
            buttonCustomMakeup={buttonCustomMakeup}
          />
        </Flex>
      </Flex>)}
      
      {imageAlign && imageAlign === 'right' && (<Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDirection="column">
          <TextBlock
            buttonText={actionsEnabled ? actions && actions[0]?.title : ""}
            isFullWidthButton={isFullWidthButton}
            linkURL={linkURL ? linkURL : actionsEnabled ? actions && actions[0]?.url : "#"}
            slogan={pretitle}
            header={title}
            subHeader={description}
            buttonStyle={buttonStyle}
            buttonCustomMakeup={buttonCustomMakeup}
          />
        </Flex>
        <Spacer />
        <Flex w={{ md: "50%" }} justifyContent="center">
          {imagePath && (
            <Image src={imagePath}  
              height="100%"
              alt={title} 
              mb={{ base: "-28%", lg: 0 }}
            />
          )}
        </Flex>
      </Flex>
      
      )}

    </>
  );
}

export default TextFeature;
