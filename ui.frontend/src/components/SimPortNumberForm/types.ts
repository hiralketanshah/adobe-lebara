import { NumberInputProps } from "../Input/types";
import { SelectOption } from "../Select/types";
import { SimPortInProps } from "../SimPortIn/types";

export interface SimPortNumberFormProps extends SimPortInProps{
  confirm: string;
  marketting: string;
  portInCodeHelpline?: number;
  multiFieldOptions?: NumberInputProps;
  onContinue?: () => void;
  onCancel?: () => void;
  onWillDoItLater?: () => void;
  maxLengthMobileNumber: number;
  maxLengthPortInCode: number;
  currentProviderSelectOptions: SelectOption[];
  consent: string;
  dataProtectionDeclation: string;
}
