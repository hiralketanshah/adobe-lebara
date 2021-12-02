package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class WhereToCallExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/whereToCallExporter";

    @InjectMocks
    WhereToCallExporter whereToCallExporter = new WhereToCallExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(WhereToCallExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    void getFileReference() {
        aemContext.currentResource(PROPERTIES_JSON);
        whereToCallExporter = aemContext.request().adaptTo(WhereToCallExporter.class);
        assertEquals("lebara/components/wheretocall", whereToCallExporter.getExportedType());
        assertEquals("title", whereToCallExporter.getTitle());
        assertEquals("fileReference", whereToCallExporter.getFileReference());
    }
}