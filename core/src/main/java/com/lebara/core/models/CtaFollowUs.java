package com.lebara.core.models;

import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adapters = {CtaFollowUs.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CtaFollowUs {

    @ValueMapValue
    private String iconImage;

    @ValueMapValue
    @Named("iconLink")
    private String link;

    public String getIconImage() {
        return iconImage;
    }

    public void setIconImage(String iconImage) {
        this.iconImage = iconImage;
    }

    public String getLink() {
        return AemUtils.getLinkWithExtension(link);
    }

    public void setLink(String link) {
        this.link = link;
    }

}
