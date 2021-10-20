package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {LoginExporter.class, ComponentExporter.class},
        resourceType = LoginExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LoginExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/loginmodule";
    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    /**
     * Login form fields Labels
     */
    @ValueMapValue
    private String loginLabel;

    @ValueMapValue
    private String emailAddressLabel;

    @ValueMapValue
    private String passwordLabel;

    @ValueMapValue
    private String forgotPassWordmsg;

    @ValueMapValue
    private String resetLinkTextLabel;

    @ValueMapValue
    private String resetLinkLabel;

    @ValueMapValue
    private String loginButton;

    /**
     * Registration form fields label
     */
    @ValueMapValue
    private Boolean registrationLabel;

    @ValueMapValue
    private String registrationEmailAddress;

    @ValueMapValue
    private String registrationPassword;

    @ValueMapValue
    private String registrationConfirmPassword;

    @ValueMapValue
    private String registrationContinueButton;

    @ValueMapValue
    private String registrationMessage;

    @ValueMapValue
    private String registrationCtaLabel;

    @ValueMapValue
    private String registrationCtaLink;

    @ValueMapValue
    private String showLabel;

    @ValueMapValue
    private String hideLabel;

    @ValueMapValue
    private String showRegistration;

    /**
     * Guest Login form fields labels
     */
    @ValueMapValue
    private String guestLoginLabel;

    @ValueMapValue
    private String guestEmailAddressLabel;

    @ValueMapValue
    private String guestPasswordLabel;

    @ValueMapValue
    private String forgotPasswordMsg;

    @ValueMapValue
    private String guestContinueLabel;

    @ValueMapValue
    private String showGuestLogin;

    /**
     * Error Message handling
     */
    @ValueMapValue
    private String emailFieldErrorMessage;

    @ValueMapValue
    private String validEmailFieldErrorMessage;

    @ValueMapValue
    private String passwordFieldErrorMessage;

    @ValueMapValue
    private String confirmPasswordFieldErrorMessage;

    @ValueMapValue
    private String mobileNumberErrorMessage;

    @ValueMapValue
    private String validMobileNumberErrorMessage;

    @ValueMapValue
    private String mobileNumberNotMatchErrorMessage;

    @ValueMapValue
    private String mobileNumberMaxLength;

    @ValueMapValue
    private String mobileNumberFieldPattern;

    public String getLoginLabel() {
        return loginLabel;
    }

    public String getEmailAddressLabel() {
        return emailAddressLabel;
    }

    public String getPasswordLabel() {
        return passwordLabel;
    }

    public String getForgotPassWordmsg() {
        return forgotPassWordmsg;
    }

    public String getResetLinkTextLabel() {
        return resetLinkTextLabel;
    }

    public String getResetLinkLabel() {
        return resetLinkLabel;
    }

    public String getLoginButton() {
        return loginButton;
    }

    public Boolean getRegistrationLabel() {
        return registrationLabel;
    }

    public String getRegistrationEmailAddress() {
        return registrationEmailAddress;
    }

    public String getRegistrationPassword() {
        return registrationPassword;
    }

    public String getRegistrationConfirmPassword() {
        return registrationConfirmPassword;
    }

    public String getRegistrationContinueButton() {
        return registrationContinueButton;
    }

    public String getRegistrationMessage() {
        return registrationMessage;
    }

    public String getRegistrationCtaLabel() {
        return registrationCtaLabel;
    }

    public String getRegistrationCtaLink() {
        return registrationCtaLink;
    }

    public String getShowLabel() {
        return showLabel;
    }

    public String getHideLabel() {
        return hideLabel;
    }

    public String getShowRegistration() {
        return showRegistration;
    }

    public String getGuestLoginLabel() {
        return guestLoginLabel;
    }

    public String getGuestEmailAddressLabel() {
        return guestEmailAddressLabel;
    }

    public String getGuestPasswordLabel() {
        return guestPasswordLabel;
    }

    public String getForgotPasswordMsg() {
        return forgotPasswordMsg;
    }

    public String getGuestContinueLabel() {
        return guestContinueLabel;
    }

    public String getShowGuestLogin() {
        return showGuestLogin;
    }

    public String getEmailFieldErrorMessage() {
        return emailFieldErrorMessage;
    }

    public String getValidEmailFieldErrorMessage() {
        return validEmailFieldErrorMessage;
    }

    public String getPasswordFieldErrorMessage() {
        return passwordFieldErrorMessage;
    }

    public String getConfirmPasswordFieldErrorMessage() {
        return confirmPasswordFieldErrorMessage;
    }

    public String getMobileNumberErrorMessage() {
        return mobileNumberErrorMessage;
    }

    public String getValidMobileNumberErrorMessage() {
        return validMobileNumberErrorMessage;
    }

    public String getMobileNumberNotMatchErrorMessage() {
        return mobileNumberNotMatchErrorMessage;
    }

    public String getMobileNumberMaxLength() {
        return mobileNumberMaxLength;
    }

    public String getMobileNumberFieldPattern() {
        return mobileNumberFieldPattern;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
