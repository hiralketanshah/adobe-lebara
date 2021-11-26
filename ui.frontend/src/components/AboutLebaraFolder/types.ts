export interface AboutLebaraProps {
	backgroundColor?: string;
	imagePath?: string;
	pretitle?: string;
	description?: string;
	title?: string;
	linkURL?: string;
	actionsEnabled?: string;
	actions?: ButtonActionProps[];
	isFullWidthButton?: boolean;
	buttonStyle?: string;
	imageAlign?: string;
}

export interface ButtonActionProps {
	title?: string;
	url?: string;
}
