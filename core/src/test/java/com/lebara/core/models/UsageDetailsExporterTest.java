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
class UsageDetailsExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/topup";

    @InjectMocks
    UsageDetailsExporter usageDetailsExporter = new UsageDetailsExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(UsageDetailsExporter.class);
        aemContext.load().json("/page.json", "/content");
    }


    @Test
    void getCtaSeeMoreCallsLabel() {
        aemContext.currentResource(PROPERTIES_JSON);
        usageDetailsExporter = aemContext.request().adaptTo(UsageDetailsExporter.class);
        assertEquals("lebara/components/usagedetails", usageDetailsExporter.getExportedType());
        assertEquals("description", usageDetailsExporter.getDescription());
        assertEquals("ctaLoadMoreLabel", usageDetailsExporter.getCtaLoadMoreLabel());
        assertEquals("ctaSeeMoreCallsLabel", usageDetailsExporter.getCtaSeeMoreCallsLabel());

    }
}