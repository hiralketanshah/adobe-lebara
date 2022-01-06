package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ActivateSimPopupFormFields {

    @ValueMapValue
    private String mobileLabel;

    @ValueMapValue
    private String ctaButtonLabel;

    @ValueMapValue
    private String ctaLinkLabel;

   @ValueMapValue
    private String ctaButtonLink;

    public String getMobileLabel() {
        return mobileLabel;
    }
    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }
    public String getCtaLinkLabel() { return ctaLinkLabel; }
    public String getCtaButtonLink() { return ctaButtonLink; }
}
