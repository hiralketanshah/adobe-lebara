package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CreateAccountExporterTest {
    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/create-account/jcr:content/root/responsivegrid/createaccount";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(CreateAccountExporter.class);
        aemContext.load().json("/create-account.json", "/content/lebara/de/de/create-account");
    }

    @Test
    void getSubHeading() {
        aemContext.currentResource(PROPERTIES_JSON);
        CreateAccountExporter createAccountExporter = aemContext.request().adaptTo(CreateAccountExporter.class);
        createAccountExporter.getSubHeading();
        createAccountExporter.getValidationMessages();
        createAccountExporter.getExportedType();
        createAccountExporter.getFrmFields().getEmailLabel();
        createAccountExporter.getFrmFields().getConfirmPasswordLabel();
        createAccountExporter.getFrmFields().getCtaButtonLabel();
        createAccountExporter.getFrmFields().getEmailPlaceholder();
    }
}