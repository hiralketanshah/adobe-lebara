import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { WelcomeScreenProps } from "./types";


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title,
  description
}) => {
return (
    <div>
        <div>Welcome Screen Component</div>
    </div>
);
  }

export default WelcomeScreen;
