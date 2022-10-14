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
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AttachSimPopupFormFields {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String mobileLabel;

    @ValueMapValue
    private String mobilePlaceHolder;

    @ValueMapValue
    private String ctaButtonLabel;

    @ValueMapValue
    private String ctaLinkLabel;

    @ValueMapValue
    private String ctaLink;

    public String getMobileLabel() {
        return mobileLabel;
    }

    public String getMobilePlaceHolder() {
        return mobilePlaceHolder;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }
    public String getCtaLinkLabel() {
        return ctaLinkLabel;
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink, resourceResolver);
    }
}