package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class,  MockitoExtension.class})
class LoginExporterTest {
    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/loginmodule";

    @InjectMocks
    LoginExporter loginExporter = new LoginExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(LoginExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getLoginModuleType() {
        aemContext.currentResource(PROPERTIES_JSON);
        loginExporter = aemContext.request().adaptTo(LoginExporter.class);
        assert loginExporter != null;
        assertEquals("loginGuest", loginExporter.getLoginModuleType());
        assertEquals("Email Address /Mobile Number", loginExporter.getLoginEmailAddressLabel());
        assertEquals("Password", loginExporter.getLoginPasswordLabel());
        assertEquals("Forgot password Message", loginExporter.getLoginForgotPassWordmsg());
        assertEquals("Reset it", loginExporter.getLoginResetLinkLabel());
        assertEquals("Login", loginExporter.getLoginButton());
        assertEquals("Email Address", loginExporter.getRegistrationEmailAddress());
        assertEquals("Password", loginExporter.getRegistrationPassword());
        assertEquals("Confirm Password", loginExporter.getRegistrationConfirmPassword());
        assertEquals("Register", loginExporter.getRegistrationCtaLabel());
        assertEquals("Show", loginExporter.getShowLabel());
        assertEquals("Hide", loginExporter.getHideLabel());
        assertEquals("Email Address /Mobile Number", loginExporter.getGuestEmailAddressLabel());
        assertEquals("Continue", loginExporter.getGuestContinueLabel());
        assertEquals("Lebara Mobile Number", loginExporter.getGuestMobileNumberLabel());
        assertEquals("Error for Email", loginExporter.getEmailFieldErrorMessage());
        assertEquals("Error for Valid Email", loginExporter.getValidEmailFieldErrorMessage());
        assertEquals("Error for Password", loginExporter.getPasswordFieldErrorMessage());
        assertEquals("Error for Confirm Password", loginExporter.getConfirmPasswordFieldErrorMessage());
        assertEquals("Error for Valid Mobile Number", loginExporter.getValidMobileNumberErrorMessage());
        assertEquals("Error for Mobile Number Not Match Message", loginExporter.getMobileNumberNotMatchErrorMessage());
        assertEquals("Error for Mobile Number Max Length", loginExporter.getMobileNumberMaxLength());
        assertEquals("Error for Mobile Number Field Pattern", loginExporter.getMobileNumberFieldPattern());
        assertEquals("Confirm Lebara Mobile Number", loginExporter.getGuestMobileNumberConfirmLabel());
        assertEquals("Error for email address/mobile number", loginExporter.getLoginEmailMobileErrMessage());
        assertEquals("Error for Confirm Password Field", loginExporter.getConfirmPasswordFieldErrorMsg());
        assertEquals("Error for valid Email Pattern", loginExporter.getErrorEmailPatternValidMsg());
        assertEquals("Error for Password Pattern", loginExporter.getErrorPasswordPatternMinMsg());
        assertEquals("Error for Confirm Password Pattern Not Matching", loginExporter.getErrorConfirmPasswordPatternNotMatchMsg());
        assertEquals("To manage/upgrade your plan. If you would like to order a second subscription, please use a different email address.", loginExporter.getSecondSubscriptionDisplayText());
        assertEquals("This email address is already registered with us.", loginExporter.getExitingUserErrorMsg());
        assertEquals("Key in your postal code and find your address.", loginExporter.getPostalCodeText());
        assertEquals("New to Lebara?", loginExporter.getExtraBlockLoginText());
        assertEquals("Login", loginExporter.getLoginTabLabel());
        assertEquals("Guest", loginExporter.getGuestTabLabel());
        assertEquals("Registration", loginExporter.getRegistrationTabLabel());
    }
}