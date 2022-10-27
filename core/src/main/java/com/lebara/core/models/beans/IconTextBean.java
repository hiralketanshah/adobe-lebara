package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {IconTextBean.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class IconTextBean {

	@SlingObject
    private ResourceResolver resourceResolver;
	
	@ValueMapValue
    private int id;
	
	@ValueMapValue
    private String icon;
    
    @ValueMapValue
    private String text;
    
	public int getId() {
		return id;
	}

	public String getIcon() {
		return icon;
	}

	public String getText() {
		return text;
	}
    
}
