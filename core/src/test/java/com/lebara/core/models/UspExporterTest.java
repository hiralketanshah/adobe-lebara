package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class UspExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/usp/jcr:content/root/responsivegrid/usp";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/usp.json", "/content/lebara/de/de/usp");
    }

    @Test
    void getUspListTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        UspExporter uspExporter = aemContext.request().adaptTo(UspExporter.class);
        uspExporter.getUspList();
        uspExporter.getExportedType();
    }
}