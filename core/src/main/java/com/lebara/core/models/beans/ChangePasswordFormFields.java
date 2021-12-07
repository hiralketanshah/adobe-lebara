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
public class ChangePasswordFormFields {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String oldPasswordLabel;

    @ValueMapValue
    private String oldPasswordPlacehodler;

    @ValueMapValue
    private String newPasswordLabel;

    @ValueMapValue
    private String newPasswprdPlacehodler;

    @ValueMapValue
    private String confirmNewPasswordLabel;

    @ValueMapValue
    private String confirmPasswordPlacehodler;

    @ValueMapValue
    private String ctaButtonLabel;

    @ValueMapValue
    private String ctaCancelLabel;

    public String getOldPasswordLabel() {
        return oldPasswordLabel;
    }

    public String getOldPasswordPlacehodler() {
        return oldPasswordPlacehodler;
    }

    public String getNewPasswordLabel() {
        return newPasswordLabel;
    }

    public String getNewPasswprdPlacehodler() {
        return newPasswprdPlacehodler;
    }

    public String getConfirmNewPasswordLabel() {
        return confirmNewPasswordLabel;
    }

    public String getConfirmPasswordPlacehodler() {
        return confirmPasswordPlacehodler;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }

    public String getCtaCancelLabel() {
        return ctaCancelLabel;
    }

}
