package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = {AppNavigation.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppNavigation {

    @ValueMapValue
    private String label;

    @ValueMapValue
    protected String link;

	@ValueMapValue
    protected String icon;

    public String getLabel() {
        return label;
    }

    public String getLink() {
		return link;
	}

	public String getIcon() {
		return icon;
	}
}
