package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class VerifyRegisterMobileExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/verify-register/jcr:content/root/responsivegrid/verifymobile";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/verify-register.json", "/content/lebara/de/de/verify-register");
    }

    @Test
    void getHeadingTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        VerifyRegisterMobileExporter verifyRegisterMobileExporter = aemContext.request().adaptTo(VerifyRegisterMobileExporter.class);
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getHeading();
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getFrmFields();
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getValidationMessages();
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getTimeCounter();
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getSuccessMessages();
        // verifyRegisterMobileExporter.getVerifyMobileNumberModal().getInitalCountdownValue();
        verifyRegisterMobileExporter.getExportedType();

    }
}