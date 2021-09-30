import { ImageProps } from "@chakra-ui/react";

export interface AwardShowCaseOption {
  image?: string;
  name?: string;
}

export interface AwardsShowCaseProps {
  title: string;
  awards: AwardShowCaseOption[] | [];
}
