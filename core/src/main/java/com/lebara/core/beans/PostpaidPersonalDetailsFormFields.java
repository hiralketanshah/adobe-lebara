package com.lebara.core.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PostpaidPersonalDetailsFormFields {

    @ValueMapValue
    private String dobTitle;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String emailPlaceholder;

    @ValueMapValue
    private String fNameLabel;

    @ValueMapValue
    private String fnamePlaceholder;

    @ValueMapValue
    private String lNameLabel;

    @ValueMapValue
    private String lNamePlaceholder;

    @ValueMapValue
    private String dobLabel;

    @ValueMapValue
    private String dayLabel;

    @ValueMapValue
    private String dayPalceholder;

    @ValueMapValue
    private String monthLabel;

    @ValueMapValue
    private String monthPlaceholder;

    @ValueMapValue
    private String yearLabel;

    @ValueMapValue
    private String yearPlaceholder;

    @ValueMapValue
    private String shippingLabel;

    @ValueMapValue
    private String shippingPlaceholder;

    @ValueMapValue
    private String currentProviderHelperText;

    @ValueMapValue
    private String currentProviderLabel;

    @ValueMapValue
        private String currentProviderPlaceholder;

    @ValueMapValue
    private String currentProviderInfoDescription;

    @ValueMapValue
    private String consentDescription;

    @ValueMapValue
    private String exitingPhoneHelperLabel;

    @ValueMapValue
    private String orTextLabel;

    @ValueMapValue
    private String portInNumberLabel;

    @ValueMapValue
    private String portInNumberPlaceHolder;

    @ValueMapValue
    private String linkCTALabel;

    @ValueMapValue
    private String buttonCTALabel;

    @ValueMapValue
    private String currentProviderInfoLinkLabel;

    @ValueMapValue
    private String currentProviderInfoLinkURL ;

    @ValueMapValue
    private String currentProviderUsageAcceptanceLabel;

    @ValueMapValue
    private String currentProviderAdvertisingAcceptanceLabel;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String consentPreviewText;

    @ValueMapValue
    private String portingNumberLabel;

    public String getDobTitle() {
        return dobTitle;
    }

    public String getEmailLabel() {
        return emailLabel;
    }

    public String getEmailPlaceholder() {
        return emailPlaceholder;
    }

    public String getfNameLabel() {
        return fNameLabel;
    }

    public String getFnamePlaceholder() {
        return fnamePlaceholder;
    }

    public String getlNameLabel() {
        return lNameLabel;
    }

    public String getlNamePlaceholder() {
        return lNamePlaceholder;
    }

    public String getDobLabel() {
        return dobLabel;
    }

    public String getDayLabel() {
        return dayLabel;
    }

    public String getDayPalceholder() {
        return dayPalceholder;
    }

    public String getMonthLabel() {
        return monthLabel;
    }

    public String getMonthPlaceholder() {
        return monthPlaceholder;
    }

    public String getYearLabel() {
        return yearLabel;
    }

    public String getYearPlaceholder() {
        return yearPlaceholder;
    }

    public String getShippingLabel() {
        return shippingLabel;
    }

    public String getShippingPlaceholder() {
        return shippingPlaceholder;
    }

    public String getCurrentProviderHelperText() {
        return currentProviderHelperText;
    }

    public String getCurrentProviderLabel() {
        return currentProviderLabel;
    }

    public String getCurrentProviderPlaceholder() {
        return currentProviderPlaceholder;
    }

    public String getCurrentProviderInfoDescription() {
        return currentProviderInfoDescription;
    }

    public String getConsentDescription() {
        return consentDescription;
    }

    public String getExitingPhoneHelperLabel() {
        return exitingPhoneHelperLabel;
    }

    public String getOrTextLabel() {
        return orTextLabel;
    }

    public String getPortInNumberLabel() {
        return portInNumberLabel;
    }

    public String getPortInNumberPlaceHolder() {
        return portInNumberPlaceHolder;
    }

    public String getLinkCTALabel() {
        return linkCTALabel;
    }

    public String getButtonCTALabel() {
        return buttonCTALabel;
    }

    public String getCurrentProviderInfoLinkLabel() {
        return currentProviderInfoLinkLabel;
    }

    public String getCurrentProviderInfoLinkURL() {
        return currentProviderInfoLinkURL;
    }

    public String getCurrentProviderUsageAcceptanceLabel() {
        return currentProviderUsageAcceptanceLabel;
    }

    public String getCurrentProviderAdvertisingAcceptanceLabel() {
        return currentProviderAdvertisingAcceptanceLabel;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getConsentPreviewText() {
        return consentPreviewText;
    }

    public String getPortingNumberLabel() {
        return portingNumberLabel;
    }
}
