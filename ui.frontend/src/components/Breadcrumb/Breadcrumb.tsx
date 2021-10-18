import React from "react";
import { Breadcrumb as ChakraBreadcrumb } from "@chakra-ui/react";
import { BreadcrumbProps } from "./types";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ ...rest }) => (
  <ChakraBreadcrumb {...rest} />
);

export default Breadcrumb;
