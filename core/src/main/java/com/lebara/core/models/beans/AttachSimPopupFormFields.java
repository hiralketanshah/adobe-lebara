package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    private String ctaButtonLink;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String ctaContinueURL;

    @ValueMapValue
    private String ctaContinueorEditLabel;

    @ValueMapValue
    private String ctaContinueorEditLink;

    public String getMobileLabel() {
        return mobileLabel;
    }

    public String getMobilePlaceHolder() {
        return mobilePlaceHolder;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }

    public String getCtaButtonLink() {
        return ctaButtonLink;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getCtaContinueURL() {
        return ctaContinueURL;
    }

    public String getCtaContinueorEditLabel() {
        return ctaContinueorEditLabel;
    }

    public String getCtaContinueorEditLink() {
        return ctaContinueorEditLink;
    }
}
