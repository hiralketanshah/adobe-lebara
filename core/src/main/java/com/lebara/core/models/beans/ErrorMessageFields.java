package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.lebara.core.utils.AemUtils;

@Model(adapters = {ErrorMessageFields.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ErrorMessageFields {

    @SlingObject
    private ResourceResolver resourceResolver;
    
    @ValueMapValue
    private String errorCode;

    @ValueMapValue
    private String errorMessage;


    public String getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
