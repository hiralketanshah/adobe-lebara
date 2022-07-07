package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageFormFields {

    @ValueMapValue
    private String buttonCTALabel;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String ctaEditMobileLabel;

    @ValueMapValue
    private String ctaResendVerificationLabel;

    @ValueMapValue
    private String mobileLabel;

    @ValueMapValue
    private String subMobileLabel;

    @ValueMapValue
    private String mobilePlaceholder;

    @ValueMapValue
    private String verifyCodeLabel;

    @ValueMapValue
    private String verifyCodePlaceholder;

    public String getButtonCTALabel() {
        return buttonCTALabel;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getCtaEditMobileLabel() {
        return ctaEditMobileLabel;
    }

    public String getCtaResendVerificationLabel() {
        return ctaResendVerificationLabel;
    }

    public String getMobileLabel() {
        return mobileLabel;
    }

    public String getSubMobileLabel() {
        return subMobileLabel;
    }

    public String getMobilePlaceholder() {
        return mobilePlaceholder;
    }

    public String getVerifyCodeLabel() {
        return verifyCodeLabel;
    }

    public String getVerifyCodePlaceholder() {
        return verifyCodePlaceholder;
    }

}
