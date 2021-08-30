import React from "react";

export interface IconListItem {
  imageDescription?: string;
	imagePath?: string;
	 imageAlt?: string;
}

export interface IconListProps {
  uspDescription: IconListItem[];
}
