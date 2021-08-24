package com.lebara.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = { ImageProperties.class }, adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageProperties {

	@ValueMapValue
	private String imagedec;

	@ValueMapValue
	private String imagealt;

	@ValueMapValue
	private String imagepath;

	public String getImagedec() {
		return imagedec;
	}

	public String getImagealt() {
		return imagealt;
	}

	public String getImagepath() {
		return imagepath;
	}

}
