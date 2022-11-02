import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { AboutLebaraProps } from "./types";
import TextBlock from "../TextBlock/TextBlock";
import { useHistory } from "@lebara/core/hooks/useHistory";
import { Image } from "@lebara/core/components/Image/Image";

const TextFeature: React.FC<AboutLebaraProps> = ({
  pretitle,
  title,
  headingType,
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
  imageUrl,
}) => {
  const buttonCustomMakeup = {
    buttonBackgroundColor: (buttonBackgroundColor || ""),
    buttonTextColor: (buttonTextColor || ""),
    buttonHoverBgColor: (buttonHoverBgColor || ""),
    buttonHoverTextColor: (buttonHoverTextColor || ""),
  }
  const history = useHistory();
  return (
    <>
      {(!imageAlign || (imageAlign === '' || imageAlign === 'left')) && (<Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex maxW={{ lg: "49.9%" }} 
          w={{ base: "100%" }}
          justifyContent="center">
          {imagePath && (
            <Image 
              src={imagePath}
              w={{base: "100%", lg: 398 }}
              height="100%"
              alt={title} 
              mb={{ base: 0, lg: 0 }}
              onClick={imageUrl ? (() => history.push(imageUrl)) : undefined}
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
            headingType={headingType}
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
              mb={{ base: 0, lg: 0 }}
              w={{ base: "100%" }}
              onClick={imageUrl ? (() => history.push(imageUrl)) : undefined}
            />
          )}
        </Flex>
      </Flex>
      
      )}

    </>
  );
}

export default TextFeature;
