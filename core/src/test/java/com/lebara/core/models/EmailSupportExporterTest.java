package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class EmailSupportExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/email-support/jcr:content/root/responsivegrid/emailsupport";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(EmailSupportExporter.class);
        aemContext.load().json("/email-support.json", "/content/lebara/de/de/email-support");
    }


    @Test
    void getDropDownValuesTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        EmailSupportExporter emailSupportExporter = aemContext.request().adaptTo(EmailSupportExporter.class);
        emailSupportExporter.getFirstName();
        emailSupportExporter.getFirstNameError();
        emailSupportExporter.getLastname();
        emailSupportExporter.getLastnameError();
        emailSupportExporter.getEmail();
        emailSupportExporter.getEmailEmptyError();
        emailSupportExporter.getEmailInvalidError();
        emailSupportExporter.getSubject();
        emailSupportExporter.getSubjectError();
        emailSupportExporter.getHelplabel();
        emailSupportExporter.getHelpError();
        emailSupportExporter.getRequestText();
        emailSupportExporter.getAttachment();
        emailSupportExporter.getAttachmentDescription();
        emailSupportExporter.getSubmitLabel();
        emailSupportExporter.getExportedType();
    }
}