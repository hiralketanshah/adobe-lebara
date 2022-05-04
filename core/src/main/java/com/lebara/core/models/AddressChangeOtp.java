package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { AddressChangeOtp.class,
		ComponentExporter.class }, resourceType = AddressChangeOtp.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AddressChangeOtp implements ComponentExporter {

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/user/addresschangeotp";

	@SlingObject
	private SlingHttpServletRequest request;

	@ScriptVariable
	private Resource resource;

	@ValueMapValue
	private String heading;

	@ValueMapValue
	private String subHeading;

	@ValueMapValue
	private String enterCodeLabel;

	@ValueMapValue
	private String simCardLabel;

	@ValueMapValue
	private String verifyCodeLabel;

	@ValueMapValue
	private String resendVerifyCodeInLabel;

	@ValueMapValue
	private String resendVerifyCodeLabel;

	@ValueMapValue
	private String otpSentSuccessMessage;

	@ValueMapValue
	private String otpExpiredErrorMessage;

	@ValueMapValue
	private String otpInvalidErrorMessage;

	@ValueMapValue
	private String exceededLimitLabel;

	@ValueMapValue
	private String exceededLimitDesc;

	@ValueMapValue
	private String requiredErrorMessage;

	@ValueMapValue
	private String digitsErrorMessage;

	@ValueMapValue
	private String whiteSpaceErrorMessage;

	@ValueMapValue
	private String msisdnPatternErrorMessage;

	@ValueMapValue
	private String failedToSendSmsErrorMessage;

	@ValueMapValue
	private String failedToGetCustomer;

	@ValueMapValue
	private String termsAndConditions;

	@ValueMapValue
	private String ctaContinueLabel;

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

    public String getHeading() {
        return heading;
    }

    public String getSubHeading() {
        return subHeading;
    }

    public String getEnterCodeLabel() {
        return enterCodeLabel;
    }

    public String getSimCardLabel() {
        return simCardLabel;
    }

    public String getVerifyCodeLabel() {
        return verifyCodeLabel;
    }

    public String getResendVerifyCodeInLabel() {
        return resendVerifyCodeInLabel;
    }

    public String getResendVerifyCodeLabel() {
        return resendVerifyCodeLabel;
    }

    public String getOtpSentSuccessMessage() {
        return otpSentSuccessMessage;
    }

    public String getOtpExpiredErrorMessage() {
        return otpExpiredErrorMessage;
    }

    public String getOtpInvalidErrorMessage() {
        return otpInvalidErrorMessage;
    }

    public String getExceededLimitLabel() {
        return exceededLimitLabel;
    }

    public String getExceededLimitDesc() {
        return exceededLimitDesc;
    }

    public String getRequiredErrorMessage() {
        return requiredErrorMessage;
    }

    public String getDigitsErrorMessage() {
        return digitsErrorMessage;
    }

    public String getWhiteSpaceErrorMessage() {
        return whiteSpaceErrorMessage;
    }

    public String getMsisdnPatternErrorMessage() {
        return msisdnPatternErrorMessage;
    }

    public String getFailedToSendSmsErrorMessage() {
        return failedToSendSmsErrorMessage;
    }

    public String getFailedToGetCustomerErrorMessage() {
        return failedToGetCustomerErrorMessage;
    }

    public String getTermsAndConditions() {
        return AemUtils.updateShortenLinksInRichText(termsAndConditions,request);
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }
}
