package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HeadingExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/heading";

    @InjectMocks
    HeadingExporter headingExporter = new HeadingExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(HeadingExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getTitle() {
        aemContext.currentResource(PROPERTIES_JSON);
        headingExporter = aemContext.request().adaptTo(HeadingExporter.class);
        assertEquals("Heading", headingExporter.getTitle());
        assertEquals("lebara/components/heading", headingExporter.getExportedType());
    }
}