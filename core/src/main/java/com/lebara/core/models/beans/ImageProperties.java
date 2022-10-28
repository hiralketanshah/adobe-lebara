package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = { ImageProperties.class }, adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageProperties {

	@ValueMapValue
	private String body;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String icon;

	public String getBody() {
		return body;
	}

	public String getTitle() {
		return title;
	}

	public String getIcon() {
		return icon;
	}
	
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
}
