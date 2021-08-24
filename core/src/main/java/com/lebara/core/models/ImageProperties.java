package com.lebara.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = { ImageProperties.class }, adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageProperties {

	@ValueMapValue
	private String imageDescription;

	@ValueMapValue
	private String imageAlt;

	@ValueMapValue
	private String imagePath;

	public String getImageDescription() {
		return imageDescription;
	}

	public String getImageAlt() {
		return imageAlt;
	}

	public String getImagePath() {
		return imagePath;
	}

}
