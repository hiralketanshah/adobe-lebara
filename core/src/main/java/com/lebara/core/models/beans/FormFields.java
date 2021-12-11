package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FormFields {

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String emailPlaceholder;

    @ValueMapValue
    private String ctaLink;

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

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink, resourceResolver);
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
