package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ChangePasswordExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/changepassword";

    @InjectMocks
    ChangePasswordExporter changePasswordExporter = new ChangePasswordExporter();

    @BeforeEach
     void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getChangePasswordHeading() {
        aemContext.currentResource(PROPERTIES_JSON);
        changePasswordExporter = aemContext.request().adaptTo(ChangePasswordExporter.class);
        assertEquals("Change Password", changePasswordExporter.getChangePasswordHeading());
        assertEquals("lebara/components/user/changepassword", changePasswordExporter.getExportedType());
    }

    @Test
    void getFrmFields() {
        aemContext.currentResource(PROPERTIES_JSON);
        changePasswordExporter = aemContext.request().adaptTo(ChangePasswordExporter.class);
        assert changePasswordExporter != null;
        assertEquals("New Password", changePasswordExporter.getFrmFields().getNewPasswordLabel());
        assertEquals("Confirm Password", changePasswordExporter.getFrmFields().getConfirmNewPasswordLabel());
        assertEquals("Confirm Password Placeholder", changePasswordExporter.getFrmFields().getConfirmPasswordPlacehodler());
        assertEquals("Enter Old Password", changePasswordExporter.getFrmFields().getOldPasswordPlacehodler());
        assertEquals("SAVE", changePasswordExporter.getFrmFields().getCtaButtonLabel());
        assertEquals("CANCEL", changePasswordExporter.getFrmFields().getCtaCancelLabel());
    }

    @Test
    void getValidationMessages() {
        aemContext.currentResource(PROPERTIES_JSON);
        changePasswordExporter = aemContext.request().adaptTo(ChangePasswordExporter.class);
        assert changePasswordExporter != null;
        assertEquals("Confirm password should be same as new password.", changePasswordExporter.getValidationMessages().getPasswordNotMatchErrorMessage());
        assertEquals("Please enter a password", changePasswordExporter.getValidationMessages().getNewPasswordRequiredMsg());
        assertEquals("Please enter a password", changePasswordExporter.getValidationMessages().getConfirmPasswordRequiredMsg());
        assertEquals("Please enter a password", changePasswordExporter.getValidationMessages().getOldPasswordRequiredMsg());
    }
}