export interface ProgressStepProps {
  pageLinks: step[];
  activeStepIndex: number;
}

export interface step {
  label: string;
  link: string;
}