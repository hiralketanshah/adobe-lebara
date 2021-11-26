export interface PdfDialogProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  ctaCLoseLabel?: string;
  ctaDowndloadLabel?: string;
}
