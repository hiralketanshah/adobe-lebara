import { ImageProps } from "@chakra-ui/react";

export interface AwardShowCaseOption {
  image?: string;
  imageProps?: ImageProps;
}

export interface AwardsShowCaseProps {
  title: string;
  awards: AwardShowCaseOption[] | [];
}
