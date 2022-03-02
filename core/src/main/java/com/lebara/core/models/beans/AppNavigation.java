package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.lebara.core.utils.AemUtils;

@Model(adapters = {AppNavigation.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppNavigation {

    @SlingObject
    private ResourceResolver resourceResolver;
    
    @ValueMapValue
    private String label;

    @ValueMapValue
    protected String appNavigationLink;
    
    @ValueMapValue
    protected String url;

    @ValueMapValue
    protected String icon;

    public String getLabel() {
        return label;
    }

    public String getAppNavigationLink() {
        return appNavigationLink;
    }
    
    public String getUrl() {
    	return AemUtils.getLinkWithExtension(url, resourceResolver);
    }

    public String getIcon() {
        return icon;
    }
}
