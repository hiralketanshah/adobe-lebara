package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PostpaidPersonalDetailsErrorMsg {
    
    @SlingObject
    private SlingHttpServletRequest slingRequest;
    
    @ValueMapValue
    private String titleRequiredMsg;

	@ValueMapValue
    private String emailRequiredMsg;

    @ValueMapValue
    private String emailInValidMsg;

    @ValueMapValue
    private String loginButtonLabel;

    @ValueMapValue
    private String existingUserErrorMsg;

    @ValueMapValue
    private String secondSubscriptionDisplayText;

    @ValueMapValue
    private String fNameRequiredMsg;

    @ValueMapValue
    private String fNameInValidMsg;

    @ValueMapValue
    private String lNameRequiredMsg;

    @ValueMapValue
    private String lNameInValidMsg;

    @ValueMapValue
    private String dayRequiredMsg;

    @ValueMapValue
    private String dayInValidMsg;

    @ValueMapValue
    private String monthRequiredMsg;

    @ValueMapValue
    private String monthInValidMsg;

    @ValueMapValue
    private String yearRequiredMsg;

    @ValueMapValue
    private String yearInValidMsg;

    @ValueMapValue
    private String yearInvalidAgeMsg;

    @ValueMapValue
    private String shippingRequiredMsg;

    @ValueMapValue
    private String portInNumberRequiredMsg;

    @ValueMapValue
    private String portInNumberInValidMsg;

    @ValueMapValue
    private String currentProviderRequiredMsg;
    
    @ValueMapValue
    private String mobileRequiredMsg;
    
    @ValueMapValue
    private String mobileInValidMsg;
    
    @ValueMapValue
    private String verifyCodeInvalidMsg;
    
    @ValueMapValue
    private String verifyCodeRequiredMsg;

    @ValueMapValue
    private String streetLabelErrorRequired;

    @ValueMapValue
    private String streetLabelErrorPattern;

    @ValueMapValue
    private String houseNumberErrorRequired;

    @ValueMapValue
    private String houseNumberErrorPattern;

    @ValueMapValue
    private String zipCodeErrorRequired;

    @ValueMapValue
    private String zipCodeErrorPattern;

    @ValueMapValue
    private String cityErrorRequired;
    
    @ValueMapValue
    public String streetLabelErrorMax;
    
    @ValueMapValue
    public String houseNumberErrorMax;
    
    @ValueMapValue
    public String zipCodeErrorMax;
    
    @ValueMapValue
    public String zipCodeErrorMin;
    
    @ValueMapValue
    public String cityPatternError;
    
    @ValueMapValue
    public String cityMaxCharError;

    public String getTitleRequiredMsg() {
		return titleRequiredMsg;
	}
    
    public String getCityErrorRequired() {
        return cityErrorRequired;
    }

    public String getStreetLabelErrorRequired() {
        return streetLabelErrorRequired;
    }

    public String getStreetLabelErrorPattern() {
        return streetLabelErrorPattern;
    }

    public String getHouseNumberErrorRequired() {
        return houseNumberErrorRequired;
    }

    public String getHouseNumberErrorPattern() {
        return houseNumberErrorPattern;
    }

    public String getZipCodeErrorRequired() {
        return zipCodeErrorRequired;
    }

    public String getZipCodeErrorPattern() {
        return zipCodeErrorPattern;
    }

    public String getfNameRequiredMsg() {
        return fNameRequiredMsg;
    }

    public String getfNameInValidMsg() {
        return fNameInValidMsg;
    }

    public String getlNameRequiredMsg() {
        return lNameRequiredMsg;
    }

    public String getlNameInValidMsg() {
        return lNameInValidMsg;
    }

    public String getEmailRequiredMsg() {
        return emailRequiredMsg;
    }

    public String getEmailInValidMsg() {
        return emailInValidMsg;
    }

    public String getLoginButtonLabel() {
        return loginButtonLabel;
    }

    public String getExistingUserErrorMsg() {
        return AemUtils.updateShortenLinksInRichText(existingUserErrorMsg,slingRequest);
    }

    public String getSecondSubscriptionDisplayText() {
        return secondSubscriptionDisplayText;
    }

    public String getDayRequiredMsg() {
        return dayRequiredMsg;
    }

    public String getDayInValidMsg() {
        return dayInValidMsg;
    }

    public String getMonthRequiredMsg() {
        return monthRequiredMsg;
    }

    public String getMonthInValidMsg() {
        return monthInValidMsg;
    }

    public String getYearRequiredMsg() {
        return yearRequiredMsg;
    }

    public String getYearInValidMsg() {
        return yearInValidMsg;
    }

    public String getYearInvalidAgeMsg() {
        return yearInvalidAgeMsg;
    }

    public String getShippingRequiredMsg() {
        return shippingRequiredMsg;
    }

    public String getPortInNumberRequiredMsg() {
        return portInNumberRequiredMsg;
    }

    public String getPortInNumberInValidMsg() {
        return portInNumberInValidMsg;
    }

    public String getCurrentProviderRequiredMsg() {
        return currentProviderRequiredMsg;
    }

    public String getMobileRequiredMsg() {
        return mobileRequiredMsg;
    }

    public String getMobileInValidMsg() {
        return mobileInValidMsg;
    }

    public String getVerifyCodeInvalidMsg() {
        return verifyCodeInvalidMsg;
    }

    public String getVerifyCodeRequiredMsg() {
        return verifyCodeRequiredMsg;
    }

    public String getStreetLabelErrorMax() {
        return streetLabelErrorMax;
    }

    public String getHouseNumberErrorMax() {
        return houseNumberErrorMax;
    }

    public String getZipCodeErrorMin() {
        return zipCodeErrorMin;
    }

    public String getZipCodeErrorMax() {
        return zipCodeErrorMax;
    }

    public String getCityPatternError() {
        return cityPatternError;
    }

    public String getCityMaxCharError() {
        return cityMaxCharError;
    }
    
}
