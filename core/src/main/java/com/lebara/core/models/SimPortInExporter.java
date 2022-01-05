package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {SimPortInExporter.class, ComponentExporter.class},
        resourceType = SimPortInExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SimPortInExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/simportin";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String pretitle;

    @ValueMapValue
    private String doitLaterButtonLabel;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String dobTitle;

    @ValueMapValue
    private String dobDesc;

    @ValueMapValue
    private String dayFieldLabel;

    @ValueMapValue
    private String monthFieldLabel;

    @ValueMapValue
    private String yearFieldLabel;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String mobileNumberDesc;

    @ValueMapValue
    private String currentProviderLabel;

    @ValueMapValue
    private String currentProviderDesc;

    @ValueMapValue
    private String currentProviderDefaultSelectValue;

    @ValueMapValue
    private String contractInfo;

    @ValueMapValue
    private String portingInfo;

    @ValueMapValue
    private String advertisingInfo;

    @ValueMapValue
    private String partnersInfo;

    @ValueMapValue
    private String consentOne;

    @ValueMapValue
    private String consentTwo;

    @ValueMapValue
    private String dataProtectionMessage;

    @ValueMapValue
    private String termsAndConditions;

    @ValueMapValue
    private String continueButtonLabel;

    @ValueMapValue
    private String cancelbuttonlabel;

    @ValueMapValue
    private String dayFieldErrorMessage;

    @ValueMapValue
    private String monthFieldErrorMessage;

    @ValueMapValue
    private String yearFieldErrorMessage;

    @ValueMapValue
    private String currentProviderErrorMessage;

    @ValueMapValue
    private String mobileNumberErrorMessage;

    @ValueMapValue
    private String mobileNumberMaxLength;

    @ValueMapValue
    private String mobileNumberFieldPattern;

    @ValueMapValue
    private String currentProvidersOptions;

    public String getPretitle() {return pretitle;}

    public String getDoitLaterButtonLabel() {
        return doitLaterButtonLabel;
    }

    public String getTitle() {
        return title;
    }

    public String getDobTitle() {
        return dobTitle;
    }

    public String getDobDesc() { return dobDesc; }

    public String getDayFieldLabel() {
        return dayFieldLabel;
    }

    public String getMonthFieldLabel() {
        return monthFieldLabel;
    }

    public String getYearFieldLabel() {
        return yearFieldLabel;
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getMobileNumberDesc() {
        return mobileNumberDesc;
    }

    public String getCurrentProviderLabel() {
        return currentProviderLabel;
    }

    public String getCurrentProviderDesc() {
        return currentProviderDesc;
    }

    public String getCurrentProviderDefaultSelectValue() {
        return currentProviderDefaultSelectValue;
    }

    public String getContractInfo() {
        return contractInfo;
    }

    public String getPortingInfo() {
        return portingInfo;
    }

    public String getAdvertisingInfo() {
        return advertisingInfo;
    }

    public String getPartnersInfo() {
        return partnersInfo;
    }

    public String getConsentOne() {
        return consentOne;
    }

    public String getConsentTwo() {
        return consentTwo;
    }

    public String getDataProtectionMessage() {
        return dataProtectionMessage;
    }

    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public String getContinueButtonLabel() {
        return continueButtonLabel;
    }

    public String getCancelbuttonlabel() {
        return cancelbuttonlabel;
    }

    public String getDayFieldErrorMessage() {
        return dayFieldErrorMessage;
    }

    public String getMonthFieldErrorMessage() {
        return monthFieldErrorMessage;
    }

    public String getYearFieldErrorMessage() {
        return yearFieldErrorMessage;
    }

    public String getCurrentProviderErrorMessage() {
        return currentProviderErrorMessage;
    }

    public String getMobileNumberErrorMessage() {
        return mobileNumberErrorMessage;
    }

    public String getMobileNumberMaxLength() {
        return mobileNumberMaxLength;
    }

    public String getMobileNumberFieldPattern() { return mobileNumberFieldPattern; }

    @JsonProperty("currentProvidersOptions")
    public List<Object> getCurrentProvidersOptions() {
        return CFUtils.getCurrentProvidersOptions(currentProvidersOptions,resourceResolver);
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
