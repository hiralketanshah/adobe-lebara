package com.lebara.core.models;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Named;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {Link.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Link {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String label;

    @ValueMapValue
    protected String link;

    @JsonIgnore
    @ValueMapValue
    @Named("link")
    private String extensionlessLink;

    @PostConstruct
    private void init() {
        Resource linkResource = resourceResolver.getResource(link);
        if (StringUtils.isBlank(label) && linkResource != null) {
            Page page = linkResource.adaptTo(Page.class);
            if (page != null) {
                label = AemUtils.getTitle(page);
            }
        }
        if (StringUtils.isBlank(label)) {
            label = link;
        }

    }

    @JsonIgnore
    public String getExtensionlessLink() {
        return extensionlessLink;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLink() {
        return AemUtils.getLinkWithExtension(link, resourceResolver);
    }

    public void setLink(String link) {
        this.link = link;
    }

}
