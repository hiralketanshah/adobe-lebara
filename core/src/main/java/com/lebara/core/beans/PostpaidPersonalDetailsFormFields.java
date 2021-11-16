package com.lebara.core.beans;

import java.util.ArrayList;
import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PostpaidPersonalDetailsFormFields {
	

    private static final String VALUE = "value";
    private static final String LABEL = "label";
    
    @SlingObject
    private ResourceResolver resourceResolver;

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
    private String shippingHelperText;
    
    @ValueMapValue
    private String consentPreviewText;
    
    @ValueMapValue
    private String consentDescription;
    
    @ValueMapValue
    private String radioNoThanks;
    
    @ValueMapValue
    private String radioPortIn;
    
    @ValueMapValue
    private String radioUseLebaraSim;
    
    @ValueMapValue
    private String portInNumberLabel;

    @ValueMapValue
    private String portInNumberPlaceHolder;
    
    @ValueMapValue
    private String currentProviderLabel;

    @ValueMapValue
    private String currentProviderPlaceholder;
    
    @ValueMapValue
    private String currentProviderHelperText;

    @ValueMapValue
    private String currentProviderInfoDescription;
    
    @ValueMapValue
    private String currentProviderInfoLinkLabel;

    @ValueMapValue
    private String currentProviderInfoLinkURL;
    
    @ValueMapValue
    private String currentProviderUsageAcceptanceLabel;

    @ValueMapValue
    private String currentProviderAdvertisingAcceptanceLabel;

    @ValueMapValue
    private String exitingPhoneHelperLabel;

    @ValueMapValue
    private String linkCTALabel;
    
    @ValueMapValue
    private String orTextLabel;

    @ValueMapValue
    private String buttonCTALabel;

    @ValueMapValue
    private String ctaContinueLabel;

    @ChildResource
    protected Resource portInOptions;

    @ValueMapValue
    private  String currentProviderList;
    
    @ValueMapValue
    private  String currentProviderAdvertisingPreviewText;

    @ValueMapValue
    public String keyInAddress;
    
    @ValueMapValue
    public String streetLabel;
    
    @ValueMapValue
    public String addressKeyInText;
    
    @ValueMapValue
    public String postalcodePlaceholder;
    
    @ValueMapValue
    public String enterAddressManually;
    
    @ValueMapValue
    public String streetPlaceholder;
    
    @ValueMapValue
    public String houseNumberLabel;
    
    @ValueMapValue
    public String houseNumberPlaceholder;
    
    @ValueMapValue
    public String zipCodeLabel;
    
    @ValueMapValue
    public String zipCodePlaceholder;
    
    @ValueMapValue
    public String cityLabel;
    
    @ValueMapValue
    public String cityPlaceholder;
    
    @ValueMapValue
    public String saveAddress;


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

	public String getShippingHelperText() {
		return shippingHelperText;
	}

	public String getRadioNoThanks() {
		return radioNoThanks;
	}

	public String getRadioPortIn() {
		return radioPortIn;
	}

	public String getRadioUseLebaraSim() {
		return radioUseLebaraSim;
	}
    public String getKeyInAddress() {
        return keyInAddress;
    }

    public String getStreetLabel() {
        return streetLabel;
    }

    public String getAddressKeyInText() {
        return addressKeyInText;
    }

    public String getPostalcodePlaceholder() {
        return postalcodePlaceholder;
    }

    public String getEnterAddressManually() {
        return enterAddressManually;
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

    public String getSaveAddress() {
        return saveAddress;
    }
    
    public String getCurrentProviderAdvertisingPreviewText() {
		return currentProviderAdvertisingPreviewText;
	}

    @JsonProperty("portInOptions")
    public List<SelectOption> getPortInOptionArray() {
        List<SelectOption> options = new ArrayList<>();
        for (Resource item : portInOptions.getChildren()) {
            SelectOption option = new SelectOption();
            option.setLabel(AemUtils.getStringProperty(item, LABEL));
            option.setValue(AemUtils.getStringProperty(item, VALUE));
            options.add(option);
        }
        return options;
    }
    
    @JsonProperty("currentProviderList")
    public List<Object> getCurrentProvidersList() {
        if(currentProviderList != null) {
            Resource currentProvidersResource = resourceResolver.getResource(currentProviderList);
            ContentFragment currentProvidersFragment = currentProvidersResource.adaptTo(ContentFragment.class);
            if (null != currentProvidersFragment) {
                return CFUtils.convertStringArrayToList(CFUtils.getElementArrayValue(currentProvidersFragment, "currentProvidersOptions"), Object.class);
            }
        }
        return new ArrayList<>();
    }
}
