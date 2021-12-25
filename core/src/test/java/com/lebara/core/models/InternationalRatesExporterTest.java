package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class InternationalRatesExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/international/jcr:content/root/responsivegrid/internationalrates";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(WhereToCallExporter.class);
        aemContext.load().json("/international.json", "/content/lebara/de/de/international");
    }

    @Test
    void getCountries() {
        aemContext.currentResource(PROPERTIES_JSON);
        InternationalRatesExporter internationalRatesExporter = aemContext.request().adaptTo(InternationalRatesExporter.class);
        internationalRatesExporter.init();
    }
}
