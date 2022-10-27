package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
class RetentionNumberVerificationExporterTest {

    private final AemContext aemContext = new AemContext();
    RetentionNumberVerificationExporter retentionNumberVerificationExporter = new RetentionNumberVerificationExporter();

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/retentionnumberverification-component.json", "/retentionnumberverification");
        aemContext.currentResource("/retentionnumberverification");
        retentionNumberVerificationExporter = aemContext.request().adaptTo(RetentionNumberVerificationExporter.class);
    }

    @Test
    void testGetIsVerifyOtp() {
        assertEquals(true, retentionNumberVerificationExporter.getIsVerifyOtp());
    }

    @Test
    void testGetCompHeading() {
        assertEquals("The verification code has been sent to {0}", retentionNumberVerificationExporter.getCompHeading());
    }

    @Test
    void testGetVerificationHeadingMessage() {
        assertEquals("Enter the 5 digit verification code", retentionNumberVerificationExporter.getVerificationHeadingMessage());
    }

    @Test
    void testGetFrmBtnPrimaryLabel() {
        assertEquals("Next", retentionNumberVerificationExporter.getFrmBtnPrimaryLabel());
    }

    @Test
    void testGetCtaLink() {
        assertEquals("/en/cart/retention-configurator.html", retentionNumberVerificationExporter.getCtaLink());
    }

    @Test
    void testGetFrmLabelNumber() {
        assertEquals("Verification Code", retentionNumberVerificationExporter.getFrmLabelNumber());
    }

    @Test
    void testGetFrmPlaceholderNumber() {
        assertEquals("Enter your verification code", retentionNumberVerificationExporter.getFrmPlaceholderNumber());
    }

    @Test
    void testGetWarningMessageTitle() {
        assertEquals("Ineligible for Retention", retentionNumberVerificationExporter.getWarningMessageTitle());
    }

    @Test
    void testGetWarningMessageDescription() {
        assertEquals("You have been determined ineligible for retention.please try a Different number", retentionNumberVerificationExporter.getWarningMessageDescription());
    }

    @Test
    void testGetWarningModalButtonLabel() {
        assertEquals("Back", retentionNumberVerificationExporter.getWarningModalButtonLabel());
    }

    @Test
    void testGetResendOtpMessage() {
        assertEquals("Didn't receive the code yet?", retentionNumberVerificationExporter.getResendOtpMessage());
    }

    @Test
    void testGetResendOtpButtonLabel() {
        assertEquals("Send again", retentionNumberVerificationExporter.getResendOtpButtonLabel());
    }

    @Test
    void testGetNumberRequiredValidationMsg() {
        assertEquals("Required", retentionNumberVerificationExporter.getNumberRequiredValidationMsg());
    }

    @Test
    void testGetErrorNumberPatternMsg() {
        assertEquals("Number not in right format", retentionNumberVerificationExporter.getErrorNumberPatternMsg());
    }

    @Test
    void testGetErrorOtpPatternMsg() {
        assertEquals("Enter valid OTP", retentionNumberVerificationExporter.getErrorOtpPatternMsg());
    }

    @Test
    void testGetEnterValidOtpErrorMessage() {
        assertEquals("Please enter valid OTP", retentionNumberVerificationExporter.getEnterValidOtpErrorMessage());
    }

    @Test
    void testGetExportedType() {
        assertEquals("lebara/components/nl/retentionnumberverification", retentionNumberVerificationExporter.getExportedType());
    }

}
