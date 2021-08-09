package com.lebara.core.models;

import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adapters = {Cta.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Cta {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String label;

    @ValueMapValue
    @Named("labelLink")
    private String link;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLink() {
        return AemUtils.getExternalizedPublishUrl(resourceResolver, link);
    }

    public void setLink(String link) {
        this.link = link;
    }

}
