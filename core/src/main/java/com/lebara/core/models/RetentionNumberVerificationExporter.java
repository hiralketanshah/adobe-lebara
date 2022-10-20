package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { RetentionNumberVerificationExporter.class,
        ComponentExporter.class }, resourceType = RetentionNumberVerificationExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RetentionNumberVerificationExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/nl/retentionnumberverification";

    @ScriptVariable
    protected Resource resource;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private boolean isVerifyOtp;

    @ValueMapValue
    private String compHeading;

    @ValueMapValue
    private String verificationHeadingMessage;

    @ValueMapValue
    private String frmBtnPrimaryLabel;

    @ValueMapValue
    private String ctaLink;

    @ValueMapValue
    private String frmLabelNumber;

    @ValueMapValue
    private String frmPlaceholderNumber;

    @ValueMapValue
    private String warningMessageTitle;

    @ValueMapValue
    private String warningMessageDescription;

    @ValueMapValue
    private String warningModalButtonLabel;

    @ValueMapValue
    private String resendOtpMessage;

    @ValueMapValue
    private String resendOtpButtonLabel;

    @ValueMapValue
    private String numberRequiredValidationMsg;

    @ValueMapValue
    private String errorNumberPatternMsg;

    @ValueMapValue
    private String errorOtpPatternMsg;

    @ValueMapValue
    private String enterValidOtpErrorMessage;

    public boolean isVerifyOtp() {
        return isVerifyOtp;
    }

    public String getCompHeading() {
        return compHeading;
    }

    public String getVerificationHeadingMessage() {
        return verificationHeadingMessage;
    }

    public String getFrmBtnPrimaryLabel() {
        return frmBtnPrimaryLabel;
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink);
    }

    public String getFrmLabelNumber() {
        return frmLabelNumber;
    }

    public String getFrmPlaceholderNumber() {
        return frmPlaceholderNumber;
    }

    public String getWarningMessageTitle() {
        return warningMessageTitle;
    }

    public String getWarningMessageDescription() {
        return warningMessageDescription;
    }

    public String getWarningModalButtonLabel() {
        return warningModalButtonLabel;
    }

    public String getResendOtpMessage() {
        return resendOtpMessage;
    }

    public String getResendOtpButtonLabel() {
        return resendOtpButtonLabel;
    }

    public String getNumberRequiredValidationMsg() {
        return numberRequiredValidationMsg;
    }

    public String getErrorNumberPatternMsg() {
        return errorNumberPatternMsg;
    }

    public String getErrorOtpPatternMsg() {
        return errorOtpPatternMsg;
    }

    public String getEnterValidOtpErrorMessage() {
        return enterValidOtpErrorMessage;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
