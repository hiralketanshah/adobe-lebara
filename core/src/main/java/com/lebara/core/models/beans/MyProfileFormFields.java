package com.lebara.core.models.beans;

import java.util.ArrayList;
import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MyProfileFormFields {

    private static final String VALUE = "value";
    private static final String LABEL = "label";
    
    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String fNamePlaceholder;

    @ValueMapValue
    private String fNameLabel;

    @ValueMapValue
    private String lNameLabel;

    @ValueMapValue
    private String lNamePlaceholder;

    @ValueMapValue
    private String streetLabel;

    @ValueMapValue
    private String streetPlaceholder;

    @ValueMapValue
    private String houseNumberLabel;

    @ValueMapValue
    private String houseNumberPlaceholder;

    @ValueMapValue
    private String zipCodeLabel;

    @ValueMapValue
    private String zipCodePlaceholder;

    @ValueMapValue
    private String cityLabel;

    @ValueMapValue
    private String cityPlaceholder;

    @ValueMapValue
    private String alternativeNumberPlaceholder;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String emailPlaceholder;

    @ValueMapValue
    private String passwordLabel;

    @ValueMapValue
    private String consentManagement;

    @ValueMapValue
    private String consentDescription;

    @ValueMapValue
    private String  ctaButtonLabel;

    @ValueMapValue
    private String  ctaCancelLabel;

    @ValueMapValue
    private String  ctaCancelURL;

    @ValueMapValue
    private String  alternativeContactLabel;

    @ValueMapValue
    private String editLinkLabel;

    @ValueMapValue
    private String emailEditLinkURL;

    @ValueMapValue
    private String passwordEditLinkURL;

    @ValueMapValue
    private String passwordPlaceholder;

    /* Edit Email Modal Fields */

    @ValueMapValue
    private String changeEmailHeading;

    @ValueMapValue
    private String newEmailLabel;

    @ValueMapValue
    private String newEmailPlacehodler;

    @ValueMapValue
    private String newConfirmEmailLabel;

    @ValueMapValue
    private String newConfirmEmailPlacehodler;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String modalCancelCTALabel;

    @ChildResource
    protected Resource subscribeOptions;

    public String getConsentDescription()
    {
        return consentDescription;
    }

    public String getfNameLabel() {
        return fNameLabel;
    }

    public String getfNamePlaceholder()
    {
        return fNamePlaceholder;
    }

    public String getlNameLabel() {
        return lNameLabel;
    }

    public String getlNamePlaceholder() {
        return lNamePlaceholder;
    }

    public String getStreetLabel() {
        return streetLabel;
    }

    public String getStreetPlaceholder() {
        return streetPlaceholder;
    }

    public String getHouseNumberLabel() {
        return houseNumberLabel;
    }

    public String getHouseNumberPlaceholder() {
        return houseNumberPlaceholder;
    }

    public String getZipCodeLabel() {
        return zipCodeLabel;
    }

    public String getZipCodePlaceholder() {
        return zipCodePlaceholder;
    }

    public String getCityLabel() {
        return cityLabel;
    }

    public String getCityPlaceholder() {
        return cityPlaceholder;
    }

    public String getAlternativeNumberPlaceholder() {
        return alternativeNumberPlaceholder;
    }

    public String getEmailLabel()
    {
        return emailLabel;
    }

    public String getEmailPlaceholder()
    {
        return emailPlaceholder;
    }

    public String getPasswordLabel()
    {
        return passwordLabel;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }

    public String getCtaCancelLabel() {
        return ctaCancelLabel;
    }

    public String getCtaCancelURL() {
        return ctaCancelURL;
    }

    public String getAlternativeContactLabel()
    {
        return alternativeContactLabel;
    }

    public String getEditLinkLabel() {
        return editLinkLabel;
    }

    public String getEmailEditLinkURL() {
        return emailEditLinkURL;
    }

    public String getPasswordEditLinkURL() {
        return passwordEditLinkURL;
    }

    public String getPasswordPlaceholder() {
        return passwordPlaceholder;
    }

    public String getNewEmailLabel() {
        return newEmailLabel;
    }

    public String getNewEmailPlacehodler() {
        return newEmailPlacehodler;
    }

    public String getNewConfirmEmailLabel() {
        return newConfirmEmailLabel;
    }

    public String getNewConfirmEmailPlacehodler() {
        return newConfirmEmailPlacehodler;
    }

    public String getChangeEmailHeading() {
        return changeEmailHeading;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getModalCancelCTALabel() {
        return modalCancelCTALabel;
    }


    @JsonProperty("subscribeOptions")
    public List<SelectOption> getPortInOptionArray() {
        List<SelectOption> options = new ArrayList<>();
        if(subscribeOptions != null) {
            for (Resource item : subscribeOptions.getChildren()) {
                SelectOption option = new SelectOption();
                option.setLabel(AemUtils.getStringProperty(item, LABEL));
                option.setValue(AemUtils.getStringProperty(item, VALUE));
                options.add(option);
            }
        }
        return options;
    }
}
