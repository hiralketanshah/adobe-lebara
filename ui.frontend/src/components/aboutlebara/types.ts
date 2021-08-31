export interface AboutLebaraProps {
	fileReferenceBackground?: string;
	imagePath?: string;
	pretitle?: string;
	description?: string;
	title?: string;
	linkURL?: string;
	actionsEnabled?: string;
	actions?: ButtonActionProps[];
}

export interface ButtonActionProps {
	title?: string;
	url?: string;
}

export interface TextBlockProps {
  slogan?: string;
  header?: string;
  subHeader?: string;
  buttonText?: string;
  linkURL?: string;
}