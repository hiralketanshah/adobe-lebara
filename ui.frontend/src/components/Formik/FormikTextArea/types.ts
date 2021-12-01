import { FormLabelProps } from "@chakra-ui/react";
import { FieldValidator } from "formik/dist/types";

export interface FormikTextAreaProps {
  name: string;
  flex?: number;
  label?: string;
  labelProps?: FormLabelProps;
  placeholder?: string;
  isRequired?: boolean;
  validate?: FieldValidator;
  removeValidation?: boolean;
  ignoreValidations?: boolean;
  isPrepaid?: boolean;
}
