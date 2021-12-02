export interface PdfDialogProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  ctaCloseLabel?: string;
  ctaDownloadLabel?: string;
}
