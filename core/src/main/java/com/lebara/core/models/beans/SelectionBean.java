package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {SelectionBean.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SelectionBean {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subheading;

    @ValueMapValue
    private String cardCtaText;

    @ValueMapValue
    private String ctaColor;

    @ValueMapValue
    private String cardCtaLink;

    @ValueMapValue
    private String cardImage;

    public String getHeading() {
        return heading;
    }

    public String getSubheading() {
        return subheading;
    }

    public String getCardCtaText() {
        return cardCtaText;
    }

    public String getCtaColor() {
        return ctaColor;
    }

    public String getCardCtaLink() {
        return AemUtils.getLinkWithExtension(cardCtaLink, resourceResolver);
    }

    public String getCardImage() {
        return cardImage;
    }
}
