export interface ProgressStepProps {
  pageLinks: step[];
  activeStepIndex: number;
  isWhiteBackground?: boolean;
  isSmallWidth?: boolean;
}

export interface step {
  label: string;
  link: string;
}