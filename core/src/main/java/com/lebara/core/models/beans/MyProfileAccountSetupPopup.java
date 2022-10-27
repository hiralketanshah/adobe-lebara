package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.lebara.core.utils.AemUtils;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class MyProfileAccountSetupPopup {
	
	@ValueMapValue
    private String successTitle;
	
	@ValueMapValue
    private String buttonText;
	
	@ValueMapValue
    private String buttonLink;

	public String getSuccessTitle() {
		return successTitle;
	}

	public String getButtonText() {
		return buttonText;
	}

	public String getButtonLink() {
		return AemUtils.getLinkWithExtension(buttonLink);
	}
	
	
}
