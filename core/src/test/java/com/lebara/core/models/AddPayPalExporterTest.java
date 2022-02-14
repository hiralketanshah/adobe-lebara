package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AddPayPalExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/add-pay-pal/jcr:content/root/responsivegrid/addpaypal";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(AddPayPalExporter.class);
        aemContext.load().json("/add-pay-pal.json", "/content/lebara/de/de/add-pay-pal");
    }

    @Test
    void getLabelTermsandConditions() {
        aemContext.currentResource(PROPERTIES_JSON);
        AddPayPalExporter addPayPalExporter = aemContext.request().adaptTo(AddPayPalExporter.class);
        addPayPalExporter.getCtaButtonLabel();
        addPayPalExporter.getCtaCancelLabel();
        addPayPalExporter.getCtaClose();
        addPayPalExporter.getModalHeadingTerms();
        addPayPalExporter.getModalHeadingPPPayment();
        addPayPalExporter.getTermsFullDescription();
        addPayPalExporter.getLabelTermsandConditions();
    }
    @Test
    void getExportedType() {
    }
}