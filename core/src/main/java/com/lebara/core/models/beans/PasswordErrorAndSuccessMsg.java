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
public class PasswordErrorAndSuccessMsg {

    @ValueMapValue
    private String passwordNotMatchErrorMessage;

    @ValueMapValue
    private String passwordRequiredMsg;

    @ValueMapValue
    private String passwordRestrictionMsg;

    @ValueMapValue
    private String confirmPasswordRequiredMsg;

    @ValueMapValue
    private String confirmPasswordRestrictionMsg;

    public String getPasswordRequiredMsg() {
        return passwordRequiredMsg;
    }

    public String getPasswordRestrictionMsg() {
        return passwordRestrictionMsg;
    }

    public String getConfirmPasswordRestrictionMsg() {
        return confirmPasswordRestrictionMsg;
    }

    public String getPasswordNotMatchErrorMessage() {
        return passwordNotMatchErrorMessage;
    }

    public String getConfirmPasswordRequiredMsg() {
        return confirmPasswordRequiredMsg;
    }

}

