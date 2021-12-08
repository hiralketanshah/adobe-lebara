package com.lebara.core.models;

import com.lebara.core.models.beans.ImageProperties;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = {SupportProperties.class}, adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SupportProperties extends ImageProperties {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String ctaLinkLabel;

    @ValueMapValue
    private String ctaLink;

    public String getCtaLinkLabel() {
        return ctaLinkLabel;
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink, resourceResolver);
    }

}