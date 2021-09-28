import { AboutLebaraProps } from "../aboutlebara/types";

export interface CarouselItemOptions {
  [key: string]: AboutLebaraProps;
}

export interface CarouselProps {
  cqItems: CarouselItemOptions;
  cqItemsOrder?: string[];
  id?: string;
}
