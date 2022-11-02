package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
class SetPasswordExporterTest {

    private final AemContext aemContext = new AemContext();
    SetPasswordExporter setPasswordExporter = new SetPasswordExporter();
    
    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/setuppassword-component.json", "/setuppassword");
        aemContext.currentResource("/setuppassword");
        setPasswordExporter = aemContext.request().adaptTo(SetPasswordExporter.class);
    }
    
    @Test
    void testGetExportedType() {
        assertEquals("lebara/components/nl/setuppassword", setPasswordExporter.getExportedType());
    }

    @Test
    void testGetPwdHelperMsg() {
        assertEquals("Minimum 6 Characters.", setPasswordExporter.getPwdHelperMsg());
    }

    @Test
    void testGetPwdConfirmHelperMsg() {
        assertEquals("Please Confirm Your Password", setPasswordExporter.getPwdConfirmHelperMsg());
    }

    @Test
    void testGetPwdRequiredValidationMsg() {
        assertEquals("Required", setPasswordExporter.getPwdRequiredValidationMsg());
    }

    @Test
    void testGetPwdMinValdiationMsg() {
        assertEquals("Minimum length is 8 characters", setPasswordExporter.getPwdMinValdiationMsg());
    }

    @Test
    void testGetPwdMaxValdiationMsg() {
        assertEquals("Maximum length is 255 characters", setPasswordExporter.getPwdMaxValdiationMsg());
    }

    @Test
    void testGetPwdConfirmRequiredValidationMsg() {
        assertEquals("Required", setPasswordExporter.getPwdConfirmRequiredValidationMsg());
    }

    @Test
    void testGetPwdConfirmMatchValidationMsg() {
        assertEquals("Password and password confirmation do not match", setPasswordExporter.getPwdConfirmMatchValidationMsg());
    }

    @Test
    void testGetFrmBtnPrimaryLabel() {
        assertEquals("Save", setPasswordExporter.getFrmBtnPrimaryLabel());
    }

    @Test
    void testGetFrmLabelNewPwd() {
        assertEquals("Password", setPasswordExporter.getFrmLabelNewPwd());
    }

    @Test
    void testGetFrmLabelReEnterNewPwd() {
        assertEquals("Confirm Password", setPasswordExporter.getFrmLabelReEnterNewPwd());
    }

    @Test
    void testGetCompHeading() {
        assertEquals("Setup Password", setPasswordExporter.getCompHeading());
    }

    @Test
    void testGetShowLabel() {
        assertEquals("Show", setPasswordExporter.getShowLabel());
    }

    @Test
    void testGetHideLabel() {
        assertEquals("Hide", setPasswordExporter.getHideLabel());
    }

    @Test
    void testGetErrorPasswordPatternMinMsg() {
        assertEquals("Password must contain minimum 8 characters including Alpha numeric, Upper case, Lower case, Number and Special character.", setPasswordExporter.getErrorPasswordPatternMinMsg());
    }

    @Test
    void testGetErrorCard() {
        assertEquals("Dear customer, this link is expired, please go to the login screen to reset it.", setPasswordExporter.getErrorCard().getSubtitle());
        assertEquals("Go to password reset", setPasswordExporter.getErrorCard().getButtonLabel());
        assertEquals("/content/dam/lebara/netherlands/free-icon.png", setPasswordExporter.getErrorCard().getIcon());
        assertEquals("link is expired", setPasswordExporter.getErrorCard().getTitle());
        assertEquals("/reset-password.html", setPasswordExporter.getErrorCard().getButtonLink());
    }
}
