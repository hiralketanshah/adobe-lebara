package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PersonalDetailsExporter.class, ComponentExporter.class},
        resourceType = PersonalDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PersonalDetailsExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/personaldetails";

    @SlingObject
    private ResourceResolver resourceResolver;
    @SlingObject
    private SlingHttpServletRequest slingRequest;
    @ValueMapValue
    public String yourPersonalDetailsLabel;
    @ValueMapValue
    private String simChoiceButtonLabel;
    @ValueMapValue
    public String firstNameLabel;
    @ValueMapValue
    public String firstNamePlaceholder;
    @ValueMapValue
    public String firstNameErrorRequired;
    @ValueMapValue
    public String firstNameErrorPattern;
    @ValueMapValue
    public String lastNameLabel;
    @ValueMapValue
    public String lastNameErrorRequired;
    @ValueMapValue
    public String lastNameErrorPattern;
    @ValueMapValue
    public String lastNamePlaceholder;
    @ValueMapValue
    public String emailAddressLabel;
    @ValueMapValue
    public String emailErrorMax;
    @ValueMapValue
    public String emailErrorRequired;
    @ValueMapValue
    public String emailErrorPattern;
    @ValueMapValue
    public String emailAddressPlaceholder;
    @ValueMapValue
    public String keyInAddress;
    @ValueMapValue
    public String addressLabel;
    @ValueMapValue
    public String addressErrorRequired;
    @ValueMapValue
    public String addressKeyInText;
    @ValueMapValue
    public String postalcodePlaceholder;
    @ValueMapValue
    public String enterAddressManually;
    @ValueMapValue
    public String changeAddressLabel;
    @ValueMapValue
    public String streetLabel;
    @ValueMapValue
    public String streetLabelErrorMax;
    @ValueMapValue
    public String streetLabelErrorRequired;
    @ValueMapValue
    public String streetLabelErrorPattern;
    @ValueMapValue
    public String streetPlaceholder;
    @ValueMapValue
    public String houseNumberLabel;
    @ValueMapValue
    public String houseNumberErrorMax;
    @ValueMapValue
    public String houseNumberErrorRequired;
    @ValueMapValue
    public String houseNumberErrorPattern;
    @ValueMapValue
    public String houseNumberPlaceholder;
    @ValueMapValue
    public String zipCodeLabel;
    @ValueMapValue
    public String zipCodeErrorMax;
    @ValueMapValue
    public String zipCodeErrorMin;
    @ValueMapValue
    public String zipCodeErrorRequired;
    @ValueMapValue
    public String zipCodeErrorPattern;
    @ValueMapValue
    public String zipCodePlaceholder;
    @ValueMapValue
    public String cityLabel;
    @ValueMapValue
    public String cityMaxCharError;
    @ValueMapValue
    private String cityPatternError;
    @ValueMapValue
    public String cityErrorRequired;
    @ValueMapValue
    public String cityPlaceholder;
    @ValueMapValue
    public String saveAddress;
    @ValueMapValue
    public String orderDetailsCta;
    @ValueMapValue
    public String paymentCta;
    @ValueMapValue
    public String existingUserErrorMsg;
    @ValueMapValue
    public String multiMsisdnErrorMsg;
    @ValueMapValue
    public String passwordField;
    @ValueMapValue
    public String confirmPasswordField;
    @ValueMapValue
    public String enterPasswordLabel;
    @ValueMapValue
    public String confirmPasswordLabel;
    @ValueMapValue
    public String minimumCharactersLabel;
    @ValueMapValue
    public String samePasswordLabel;
    @ValueMapValue
    public String showPasswordLabel;
    @ValueMapValue
    public String hidePasswordLabel;
    @ValueMapValue
    public String confirmPasswordPatternError;
    @ValueMapValue
    public String passwordPatternError;
    @ValueMapValue
    private boolean showRegistration;
    @ValueMapValue
    private String registrationLabel;
    @ValueMapValue
    private String legalRegistrationLabel;
    @ValueMapValue
    private String simRegistrationInfo;
    @ValueMapValue
    private String registerLaterLabel;
    @ValueMapValue
    private String documentLabel;
    @ValueMapValue
    private String documentPlaceholder;
    @ValueMapValue
    private String documentNumberLabel;
    @ValueMapValue
    private String documentNumberPlacholder;
    @ValueMapValue
    private String documentErrorRequired;
    @ValueMapValue
    private String documentNumberErrorRequired;
    @ValueMapValue
    private String documentNumberErrorPattern;
    @ValueMapValue
    private String documentTypesPath;
    @ValueMapValue
    private String cfPath;
    @ValueMapValue
    private boolean showTermsAndConditions;
    @ValueMapValue
    private String termsConditionsLabel;
    @ValueMapValue
    private String termsAndConditions;
    @ValueMapValue
    private String termsConditionsError;
    @ValueMapValue
    private boolean showTitle;
    @ValueMapValue
    private String titleLabel;
    @ValueMapValue
    private String titlePlaceholder;
    @ValueMapValue
    private String titleErrorRequired;
    @ValueMapValue
    private String addressRequired;
    @ValueMapValue
    private String titleFragmentPath;
    @ValueMapValue
    private boolean showDob;
    @ValueMapValue
    private String dobLabel;
    @ValueMapValue
    private String dobPlaceholder;
    @ValueMapValue
    private String dobErrorRequired;
    @ValueMapValue
    private String dobError;
    @ValueMapValue
    private String additionalDeliveryLabel;
    @ValueMapValue
    private String additionalDeliveryPlaceholder;
    @ValueMapValue
    private boolean showUpdatedAddressFields;
    @ValueMapValue
    private boolean enableEmailCheckbox;
    @ValueMapValue
    private boolean enableSmsCheckbox;
    @ValueMapValue
    private boolean makePaymentOnCart;
    @ValueMapValue
    private String additionFieldLengthError;
    @ValueMapValue
    private boolean weekStartFromMonday;
    
    public List<SelectBean> getCities(){
        return CFUtils.populateCityInfo(resourceResolver.getResource(cfPath));
    }

	public boolean getShowRegistration() {
		return showRegistration;
	}

	public String getRegistrationLabel() {
		return registrationLabel;
	}

	public String getSimRegistrationInfo() {
		return simRegistrationInfo;
	}

	public String getRegisterLaterLabel() {
		return registerLaterLabel;
	}

	public String getDocumentLabel() {
		return documentLabel;
	}

	public String getDocumentPlaceholder() {
		return documentPlaceholder;
	}

	public String getDocumentNumberLabel() {
		return documentNumberLabel;
	}

	public String getDocumentErrorRequired() {
		return documentErrorRequired;
	}

	public String getDocumentNumberErrorRequired() {
		return documentNumberErrorRequired;
	}

	public String getDocumentNumberPlacholder() {
		return documentNumberPlacholder;
	}

	public String getDocumentNumberErrorPattern() {
		return documentNumberErrorPattern;
	}

    public List<Object> getDocumentTypes() {
        return CFUtils.getCurrentProvidersOptions(documentTypesPath,resourceResolver);
    }

	public boolean getShowTermsAndConditions() {
		return showTermsAndConditions;
	}

    public String getTermsConditionsLabel() {
        return AemUtils.updateShortenLinksInRichText(termsConditionsLabel,slingRequest);
    }

    public String getTermsAndConditions() {
        return AemUtils.updateShortenLinksInRichText(termsAndConditions,slingRequest);
    }

	public String getTermsConditionsError() {
		return termsConditionsError;
	}

	public boolean getShowTitle() {
		return showTitle;
	}

	public String getTitleLabel() {
		return titleLabel;
	}

	public String getTitlePlaceholder() {
		return titlePlaceholder;
	}

	public String getTitleErrorRequired() {
		return titleErrorRequired;
	}

    public List<Object> getTitleOptions() {
        return CFUtils.getCurrentProvidersOptions(titleFragmentPath,resourceResolver);
    }

	public boolean getShowDob() {
		return showDob;
	}

	public String getDobLabel() {
		return dobLabel;
	}

	public String getDobPlaceholder() {
		return dobPlaceholder;
	}

	public String getDobErrorRequired() {
		return dobErrorRequired;
	}

	public String getDobError() {
		return dobError;
	}

	public String getAdditionalDeliveryLabel() {
		return additionalDeliveryLabel;
	}

	public String getAdditionalDeliveryPlaceholder() {
		return additionalDeliveryPlaceholder;
	}

	public boolean getShowUpdatedAddressFields() {
		return showUpdatedAddressFields;
	}

	public boolean getEnableEmailCheckbox() {
		return enableEmailCheckbox;
	}

	public boolean getEnableSmsCheckbox() {
		return enableSmsCheckbox;
	}

	public boolean getMakePaymentOnCart() {
		return makePaymentOnCart;
	}

    public String getSimChoiceButtonLabel() {
        return simChoiceButtonLabel;
    }

    public String getCityPatternError() {
        return cityPatternError;
    }

    public String getCityMaxCharError() {
        return cityMaxCharError;
    }

    public String getLegalRegistrationLabel() {
        return legalRegistrationLabel;
    }

    public String getAdditionFieldLengthError() {
        return additionFieldLengthError;
    }

    public String getAddressRequired() {
        return addressRequired;
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

    public boolean getWeekStartFromMonday() {
        return weekStartFromMonday;
    }

    public String getExistingUserErrorMsg() {
        return AemUtils.updateShortenLinksInRichText(existingUserErrorMsg,slingRequest);
    }

    public String getMultiMsisdnErrorMsg() {
        return multiMsisdnErrorMsg;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}