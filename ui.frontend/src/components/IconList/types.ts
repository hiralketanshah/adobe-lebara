import { ImageProps } from "@chakra-ui/react";

export interface IconListItem {
  icon: string;
  title: string;
  body: string;
  imageProps?: ImageProps;
}

export interface IconListProps {
  items: IconListItem[];
}
