import { BreadcrumbProps as ChakraBreadcrumbProps } from "@chakra-ui/react";
export interface BreadcrumbProps extends ChakraBreadcrumbProps {}
interface LebaraBreadCrumbItem {
    title: string;
    url?: string;
  }
export interface LebaraBreadcrumbProps {
    items: LebaraBreadCrumbItem[];
}

