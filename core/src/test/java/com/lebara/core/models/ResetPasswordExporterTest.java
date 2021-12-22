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
class ResetPasswordExporterTest {
    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/resetpassword";

    @InjectMocks
    ResetPasswordExporter resetPasswordExporter = new ResetPasswordExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(ResetPasswordExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getResetPwdTitle() {
        aemContext.currentResource(PROPERTIES_JSON);
        resetPasswordExporter = aemContext.request().adaptTo(ResetPasswordExporter.class);
        assert resetPasswordExporter != null;
        assertEquals("Reset Password", resetPasswordExporter.getResetPwdTitle());
        assertEquals("Email Address", resetPasswordExporter.getResetPwdEmailLabel());
        assertEquals("Mobile Number", resetPasswordExporter.getResetPwdMobileLabel());
        assertEquals("RESET PASSWORD", resetPasswordExporter.getResetPwdButtonLabel());
        assertEquals("CANCEL", resetPasswordExporter.getResetPwdButtonCancelLabel());
    }

}