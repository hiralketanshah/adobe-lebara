package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class SupportExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/support/jcr:content/root/responsivegrid/support";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/support.json", "/content/lebara/de/de/support");
    }


    @Test
    void getSupportListTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        SupportExporter supportExporter = aemContext.request().adaptTo(SupportExporter.class);
        supportExporter.getSupportList();
        supportExporter.getDescription();
        supportExporter.getHeading();
        supportExporter.getExportedType();
    }
}
