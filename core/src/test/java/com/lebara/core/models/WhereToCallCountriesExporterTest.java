package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class WhereToCallCountriesExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/addons/jcr:content/root/responsivegrid/wheretocall";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(WhereToCallExporter.class);
        aemContext.load().json("/where-to-call.json", "/content/lebara/de/de/addons");
    }

    @Test
    void getCountries() {
        aemContext.currentResource(PROPERTIES_JSON);
        WhereToCallExporter whereToCallExporter = aemContext.request().adaptTo(WhereToCallExporter.class);
        whereToCallExporter.getCountries();
    }
}