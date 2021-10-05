import { AboutLebaraProps } from "../AboutLebara/types";

export interface CarouselItemOptions {
  [key: string]: AboutLebaraProps;
}

export interface CarouselProps {
  cqItems: CarouselItemOptions;
  cqItemsOrder?: string[];
  id?: string;
}
