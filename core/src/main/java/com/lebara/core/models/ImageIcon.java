package com.lebara.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adapters = {ImageIcon.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageIcon {

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String name;

    public String getImage() {
        return image;
    }

    public String getName() {
        return name;
    }
}
