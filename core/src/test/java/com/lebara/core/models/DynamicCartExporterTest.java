package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DynamicCartExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/dynamic-cart-exporter/jcr:content/root/responsivegrid/dynamiccart";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(DynamicCartExporter.class);
        aemContext.load().json("/dynamic-cart.json", "/content/lebara/de/de/dynamic-cart-exporter");
    }

    @Test
    void getViewPlanAccordianLabel() {
        aemContext.currentResource(PROPERTIES_JSON);
        DynamicCartExporter dynamicCartExporter = aemContext.request().adaptTo(DynamicCartExporter.class);
        dynamicCartExporter.getTitle();
        dynamicCartExporter.getExportedType();
        dynamicCartExporter.getViewPlanAccordianLabel();
    }

}