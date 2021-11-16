package com.lebara.core.beans;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.models.Link;
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

    @ValueMapValue
    private String link;

    private String description;
    private String title;

    @PostConstruct
    private void init() {
        PageInfo pageInfo = new PageInfo();
        Page page = resourceResolver.getResource(link).adaptTo(Page.class);
        if (page != null) {
            description = page.getDescription();
            title = page.getTitle();
        }
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getLink() {
        return link;
    }

    @Override
    public void setLink(String link) {
        this.link = link;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
