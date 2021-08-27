// @ts-nocheck
import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";
import TextBlock from "./TextBlock";
import { AboutLebaraProps } from "./types";

const Aboutlebara: React.FC<AboutLebaraProps> = ({
  fileReferenceBackground,
  imagePath,
  pretitle,
  description,
  title,
  linkURL,
  actionsEnabled,
  actions,
}) => {
  return (
    <Box>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        backgroundRepeat="no-repeat"
        backgroundPosition={{ base: "60%", md: "unset" }}
        backgroundSize="cover"
        backgroundImage={fileReferenceBackground}
        pt={{ base: "240px", md: "140px" }}
        pl={{ md: "40px" }}
      >
        <Flex w={{ md: "50%" }} justifyContent="center">
          {imagePath && (
            <Image src={imagePath} height="100%" alt="About lebara" />
          )}
        </Flex>
        <Flex
          flexDirection="column"
          w={{ md: "40%" }}
          pt={{ md: "140px" }}
          pr={{ md: "80px" }}
        >
          <TextBlock
            slogan={pretitle}
            buttonText={actionsEnabled ? actions[0]?.title : ""}
            header={title}
            linkURL={linkURL}
            imagePath={imagePath}
            subHeader={description}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Aboutlebara;
