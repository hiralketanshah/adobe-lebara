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
class IntroExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/orderdetails";

    @InjectMocks
    IntroExporter introExporter = new IntroExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(IntroExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    final void getBackgroundImage() {
        aemContext.currentResource(PROPERTIES_JSON);
        introExporter = aemContext.request().adaptTo(IntroExporter.class);
        assertEquals("lebara/components/intro", introExporter.getExportedType());
        assertEquals("description", introExporter.getDescription());
        assertEquals("heading", introExporter.getHeading());
    }
}