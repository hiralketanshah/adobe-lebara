package com.lebara.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adapters = {Links.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Links {

    @ValueMapValue
    private String label;

    @ValueMapValue
    @Named("labelLink")
    private String link;

    @JsonIgnore
    @ValueMapValue
    @Named("labelLink")
    private String extensionlessLink;

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
        return AemUtils.getLinkWithExtension(link);
    }

    public void setLink(String link) {
        this.link = link;
    }

}
