package com.lebara.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adapters = {Link.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Link {

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String link;

    @JsonIgnore
    @ValueMapValue
    @Named("link")
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