//@ts-nocheck
import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { ListProps } from "./types";
import TickInCircle from "./circle-tick.svg";

const List: React.FC<ListProps> = ({ items, textColor = "bodyCopy" }) => (
  <Box>
    {items.map((text) => (
      <Text
        color={textColor}
        fontSize={14}
        lineHeight={0.93}
        mb={11.5}
        key={text}
        d="flex"
      >
        <Image src={TickInCircle} marginRight="20px" />
        {text}
      </Text>
    ))}
  </Box>
);

export default List;
