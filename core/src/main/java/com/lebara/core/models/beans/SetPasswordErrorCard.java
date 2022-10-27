package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SetPasswordErrorCard {

	@ValueMapValue
    private String icon;
	
	@ValueMapValue
    private String title;
	
	@ValueMapValue
    private String subtitle;
	
	@ValueMapValue
    private String buttonLabel;
	
	@ValueMapValue
    private String buttonLink;

	public String getIcon() {
		return icon;
	}

	public String getTitle() {
		return title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public String getButtonLabel() {
		return buttonLabel;
	}

	public String getButtonLink() {
		return AemUtils.getLinkWithExtension(buttonLink);
	}
	
	
}
