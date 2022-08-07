package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {SimDetailsExporter.class, ComponentExporter.class},
        resourceType = SimDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SimDetailsExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/simdetails";

    @SlingObject
    private SlingHttpServletRequest slingRequest;
    @ValueMapValue
    private String simLabel;
    @ValueMapValue
    private String legalRegFailedLink;
    @ValueMapValue
    private String legalRegSuccessLink;
    @ValueMapValue
    private String mobileNumberLabel;
    @ValueMapValue
    private String mobileNumberDescription;
    @ValueMapValue
    private String mobileNumberPlaceholder;
    @ValueMapValue
    private String lastFourDigitLabel;
    @ValueMapValue
    private String lastFourDigitDescription;
    @ValueMapValue
    private String lastFourDigitPlaceholder;
    @ValueMapValue
    private String description;
    @ValueMapValue
    private String simImage;
    @ValueMapValue
    private String termsAndConditions;
    @ValueMapValue
    private String continueButtonLabel;
    @ValueMapValue
    private String mobileNumberErrorRequired;
    @ValueMapValue
    private String mobileNumberErrorPattern;
    @ValueMapValue
    private String lastFourDigitErrorRequired;
    @ValueMapValue
    private String lastFourDigitErrorPattern;
    @ValueMapValue
    private String termsAndConditionsErrorRequired;
    @ValueMapValue
    private String errorMessage;

    public String getSimLabel() {
        return simLabel;
    }

    public String getLegalRegFailedLink() {
        return AemUtils.getLinkWithExtension(legalRegFailedLink, slingRequest);
    }

    public String getLegalRegSuccessLink() {
        return AemUtils.getLinkWithExtension(legalRegSuccessLink, slingRequest);
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getMobileNumberDescription() {
        return mobileNumberDescription;
    }

    public String getMobileNumberPlaceholder() {
        return mobileNumberPlaceholder;
    }

    public String getLastFourDigitLabel() {
        return lastFourDigitLabel;
    }

    public String getLastFourDigitDescription() {
        return lastFourDigitDescription;
    }

    public String getLastFourDigitPlaceholder() {
        return lastFourDigitPlaceholder;
    }

    public String getDescription() {
        return AemUtils.updateShortenLinksInRichText(description, slingRequest);
    }

    public String getSimImage() {
        return simImage;
    }

    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public String getContinueButtonLabel() {
        return continueButtonLabel;
    }

    public String getMobileNumberErrorRequired() {
        return mobileNumberErrorRequired;
    }

    public String getMobileNumberErrorPattern() {
        return mobileNumberErrorPattern;
    }

    public String getLastFourDigitErrorRequired() {
        return lastFourDigitErrorRequired;
    }

    public String getLastFourDigitErrorPattern() {
        return lastFourDigitErrorPattern;
    }

    public String getTermsAndConditionsErrorRequired() {
        return termsAndConditionsErrorRequired;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
