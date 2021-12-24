package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FormFields {

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String emailPlaceholder;

    @ValueMapValue
    private String mobileLabel;

    @ValueMapValue
    private String mobilePlaceholder;

    @ValueMapValue
    private String ctaButtonLabel;

    @ValueMapValue
    private String passwordLabel;

    @ValueMapValue
    private String confirmPasswordLabel;

    public String getEmailLabel() {
        return emailLabel;
    }

    public String getEmailPlaceholder() {
        return emailPlaceholder;
    }

    public String getMobileLabel() {
        return mobileLabel;
    }

    public String getMobilePlaceholder() {
        return mobilePlaceholder;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }

    public String getPasswordLabel() {
        return passwordLabel;
    }

    public String getConfirmPasswordLabel() {
        return confirmPasswordLabel;
    }
}
