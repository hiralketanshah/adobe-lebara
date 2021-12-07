import { AttachYourSimProps } from "../AttachYourSim/types";

export interface DLinkSimProps extends AttachYourSimProps{
  sim?: string;
  isOpen: any;
  onClose: (isConfirm: boolean) => void;
}
