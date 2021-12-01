package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PortingExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/orderdetails";

    @InjectMocks
    PortingExporter portingExporter = new PortingExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(PortingExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    final void getBackgroundImage() {
        aemContext.currentResource(PROPERTIES_JSON);
        portingExporter = aemContext.request().adaptTo(PortingExporter.class);
        assertEquals("lebara/resourceType", portingExporter.getExportedType());
        assertEquals("ctaOneLable", portingExporter.getCtaOneLable());
        assertEquals("ctaTwoLable", portingExporter.getCtaTwoLable());
        assertEquals("description", portingExporter.getDescription());
        assertEquals("formName", portingExporter.getFormName());
    }
}