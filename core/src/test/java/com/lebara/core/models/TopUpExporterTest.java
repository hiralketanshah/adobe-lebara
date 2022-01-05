package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TopUpExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/top-up/jcr:content/root/responsivegrid/topup";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/topup.json", "/content/lebara/de/de/top-up");
    }

    @Test
    void getHeadingTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        TopUpExporter topUpExporter = aemContext.request().adaptTo(TopUpExporter.class);
        topUpExporter.getHeading();
        topUpExporter.getRightTitle();
        topUpExporter.getRightSubTitle();
        topUpExporter.getBuyTopUpLabel();
        topUpExporter.getAddToCartLabel();
        topUpExporter.getPopUpCtaLabel();
        topUpExporter.getTopUpOptions();
        topUpExporter.getExportedType();
    }
}