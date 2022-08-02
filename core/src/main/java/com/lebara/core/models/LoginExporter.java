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

    @ValueMapValue
    private String loginModuleType;
    /**
     * Login form fields Labels
     */

    @ValueMapValue
    private String loginTabLabel;

    @ValueMapValue
    private String registrationTabLabel;

    @ValueMapValue
    private String guestTabLabel;

    @ValueMapValue
    private String loginEmailAddressLabel;

    @ValueMapValue
    private String loginEmailAddressPlaceholder;

    @ValueMapValue
    private String loginPasswordLabel;

    @ValueMapValue
    private String loginForgotPassWordmsg;

    @ValueMapValue
    private String loginResetLinkTextLabel;

    @ValueMapValue
    private String loginResetLinkLabel;

    @ValueMapValue
    private String loginButton;
    /**
     * Registration form fields label
     */

    @ValueMapValue
    private String extraBlockGuestLinkText;

    @ValueMapValue
    private String registrationEmailAddress;
    
    @ValueMapValue
    private String registrationEmailAddressPlaceholder;

    @ValueMapValue
    private String registrationPassword;

    @ValueMapValue
    private String registrationConfirmPassword;

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
    /**
     * Guest Login form fields labels
     */
    @ValueMapValue
    private String guestLoginLabel;

    @ValueMapValue
    private String guestEmailAddressLabel;

    @ValueMapValue
    private String guestMobileNumberLabel;

    @ValueMapValue
    private String guestForgotPasswordMsg;

    @ValueMapValue
    private String guestResetLinkTextLabel;

    @ValueMapValue
    private String extraBlockGuestText;

    @ValueMapValue
    private String guestResetLinkLabel;

    @ValueMapValue
    private String guestContinueLabel;
    /**
     * Error Message handling
     */
    @ValueMapValue
    private String emailFieldErrorMessage;
    
    @ValueMapValue
    private String loginEmailFieldErrorMessage;

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

    @ValueMapValue
    private String guestMobileNumberConfirmLabel;

    @ValueMapValue
    private String  loginEmailMobileErrMessage;

    @ValueMapValue
    private String  confirmPasswordFieldErrorMsg;

    @ValueMapValue
    private String  errorEmailPatternValidMsg;

    @ValueMapValue
    private String  errorPasswordPatternMinMsg;

    @ValueMapValue
    private String  errorConfirmPasswordPatternNotMatchMsg;

    @ValueMapValue
    private String  secondSubscriptionDisplayText;

    @ValueMapValue
    private String  exitingUserErrorMsg;

    @ValueMapValue
    private String  postalCodeText;

    @ValueMapValue
    private String  loginButtonLabel;

    @ValueMapValue
    private String extraBlockOrText;

    @ValueMapValue
    private String extraBlockLoginText;

    @ValueMapValue
    private String extraBlockLoginLinkText;

    @ValueMapValue
    private String extraBlockRegisterText;

    @ValueMapValue
    private String extraBlockRegisterLinkText;

    @ValueMapValue
    private String alertMessageText;

    @ValueMapValue
    private boolean showExpiryMessage;

    public String getLoginModuleType() {
        return loginModuleType;
    }

    public String getLoginEmailAddressLabel() {
        return loginEmailAddressLabel;
    }

    public String getLoginEmailAddressPlaceholder() {
        return loginEmailAddressPlaceholder;
    }
    public String getLoginPasswordLabel() {
        return loginPasswordLabel;
    }

    public String getLoginForgotPassWordmsg() {
        return loginForgotPassWordmsg;
    }

    public String getLoginResetLinkTextLabel() {
        return loginResetLinkTextLabel;
    }

    public String getLoginResetLinkLabel() {
        return loginResetLinkLabel;
    }

    public String getLoginButton() {
        return loginButton;
    }

    public String getRegistrationEmailAddress() {
        return registrationEmailAddress;
    }
    
    public String getRegistrationEmailAddressPlaceholder() {
        return registrationEmailAddressPlaceholder;
    }

    public String getRegistrationPassword() {
        return registrationPassword;
    }

    public String getRegistrationConfirmPassword() {
        return registrationConfirmPassword;
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

    public String getGuestLoginLabel() {
        return guestLoginLabel;
    }

    public String getGuestEmailAddressLabel() {
        return guestEmailAddressLabel;
    }

    public String getGuestContinueLabel() {
        return guestContinueLabel;
    }

    public String getGuestMobileNumberLabel() {
        return guestMobileNumberLabel;
    }

    public String getGuestForgotPasswordMsg() {
        return guestForgotPasswordMsg;
    }

    public String getGuestResetLinkTextLabel() {
        return guestResetLinkTextLabel;
    }

    public String getGuestResetLinkLabel() {
        return guestResetLinkLabel;
    }

    public String getEmailFieldErrorMessage() {
        return emailFieldErrorMessage;
    }
    
    public String getLoginEmailFieldErrorMessage() {
        return loginEmailFieldErrorMessage;
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

    public String getGuestMobileNumberConfirmLabel() {
        return guestMobileNumberConfirmLabel;
    }

    public String getLoginEmailMobileErrMessage() {
        return loginEmailMobileErrMessage;
    }

    public String getConfirmPasswordFieldErrorMsg() {
        return confirmPasswordFieldErrorMsg;
    }

    public String getErrorEmailPatternValidMsg() {
        return errorEmailPatternValidMsg;
    }

    public String getErrorPasswordPatternMinMsg() {
        return errorPasswordPatternMinMsg;
    }

    public String getErrorConfirmPasswordPatternNotMatchMsg() {
        return errorConfirmPasswordPatternNotMatchMsg;
    }

    public String getSecondSubscriptionDisplayText() {
        return secondSubscriptionDisplayText;
    }

    public String getExitingUserErrorMsg() {
        return exitingUserErrorMsg;
    }

    public String getPostalCodeText() {
        return postalCodeText;
    }

    public String getLoginButtonLabel() {
        return loginButtonLabel;
    }

    public String getExtraBlockLoginText() {return extraBlockLoginText;}

    public String getExtraBlockLoginLinkText() { return extraBlockLoginLinkText;}

    public String getExtraBlockRegisterText() { return extraBlockRegisterText;}

    public String getExtraBlockRegisterLinkText() {return extraBlockRegisterLinkText; }

    public String getExtraBlockOrText() { return extraBlockOrText;}

    public String getLoginTabLabel() {
        return loginTabLabel;
    }
    public String getRegistrationTabLabel() {
        return registrationTabLabel;
    }

    public String getGuestTabLabel() {
        return guestTabLabel;
    }

    public String getExtraBlockGuestText() {
        return extraBlockGuestText;
    }

    public String getExtraBlockGuestLinkText() {
        return extraBlockGuestLinkText;
    }

    public String getAlertMessageText() {
        return alertMessageText;
    }

    public boolean getShowExpiryMessage() {
        return showExpiryMessage;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
