package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RecommendedTariffExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/recommended-tarrif/jcr:content/root/responsivegrid/recommendedtariff";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/recommended-tarrif.json", "/content/lebara/de/de/recommended-tarrif");
    }

    @Test
    void getOffersTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        RecommendedTariffExporter recommendedTariffExporter = aemContext.request().adaptTo(RecommendedTariffExporter.class);
        recommendedTariffExporter.init();
        recommendedTariffExporter.getExportedType();
    }

}