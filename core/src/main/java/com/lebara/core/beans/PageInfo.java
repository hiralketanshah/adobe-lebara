package com.lebara.core.beans;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.models.Link;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {PageInfo.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageInfo extends Link {

    @SlingObject
    private ResourceResolver resourceResolver;

    private String description;
    private String title;

    @PostConstruct
    private void init() {
        Page page = resourceResolver.getResource(link).adaptTo(Page.class);
        if (page != null) {
            description = page.getDescription();
            title = AemUtils.getTitle(page);
        }
    }


    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

}
