import { deleteCartItemCmsProps } from "../../layouts/types";

export interface DeleteCartItemDialogProps extends deleteCartItemCmsProps{
  isOpen: boolean;
  product?: string;
  type?: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}
