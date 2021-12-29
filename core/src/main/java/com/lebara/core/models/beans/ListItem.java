package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {ListItem.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ListItem {

    @SlingObject
    private ResourceResolver resourceResolver;

    @Named("link")
    @ValueMapValue
    private String url;

    @Named("text")
    @ValueMapValue
    protected String title;

    public String getUrl() {
        if (resourceResolver != null) {
            url = AemUtils.getLinkWithExtension(url, resourceResolver);
        }
        return url;
    }

    public String getTitle() {
        return title;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
