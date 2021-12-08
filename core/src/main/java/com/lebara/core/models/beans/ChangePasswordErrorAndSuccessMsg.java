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
public class ChangePasswordErrorAndSuccessMsg {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String passwordNotMatchErrorMessage;

    @ValueMapValue
    private String newPasswordRequiredMsg;

    @ValueMapValue
    private String confirmPasswordRequiredMsg;

    @ValueMapValue
    private String oldPasswordRequiredMsg;

    public String getPasswordNotMatchErrorMessage() {
        return passwordNotMatchErrorMessage;
    }

    public String getNewPasswordRequiredMsg() {
        return newPasswordRequiredMsg;
    }

    public String getConfirmPasswordRequiredMsg() {
        return confirmPasswordRequiredMsg;
    }

    public String getOldPasswordRequiredMsg() {
        return oldPasswordRequiredMsg;
    }
}

