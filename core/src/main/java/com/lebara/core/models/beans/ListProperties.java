package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = { ListProperties.class }, adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ListProperties {

	@ValueMapValue
	private String popuptext;

	@ValueMapValue
	private String title;

	public String getPopuptext() {
		return popuptext;
	}

	public String getTitle() {
		return title;
	}
}
