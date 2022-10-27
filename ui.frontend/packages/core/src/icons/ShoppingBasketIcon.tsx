import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const ShoppingBasketIcon = (props: IconProps) => (
  <Icon viewBox="0 0 100 105" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M33 0V44H28V0H33Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M28 0H75V5H28V0Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M75 0V44H70V0H75Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M87.6624 26.9153H12.3376C8.24927 26.9153 4.93504 30.2163 4.93504 34.2882V92.7118C4.93504 96.7837 8.24928 100.085 12.3376 100.085H87.6624C91.7507 100.085 95.065 96.7837 95.065 92.7118V34.2882C95.065 30.2163 91.7507 26.9153 87.6624 26.9153ZM12.3376 22C5.52373 22 0 27.5016 0 34.2882V92.7118C0 99.4984 5.52373 105 12.3376 105H87.6624C94.4763 105 100 99.4984 100 92.7118V34.2882C100 27.5016 94.4763 22 87.6624 22H12.3376Z"
    />
  </Icon>
);

export default ShoppingBasketIcon;
