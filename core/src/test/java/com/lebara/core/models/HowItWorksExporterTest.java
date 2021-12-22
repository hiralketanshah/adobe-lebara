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
class HowItWorksExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/howitworks";

    @InjectMocks
    HowItWorksExporter howItWorksExporter = new HowItWorksExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(HowItWorksExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getDescription() {
        aemContext.currentResource(PROPERTIES_JSON);
        howItWorksExporter = aemContext.request().adaptTo(HowItWorksExporter.class);
        assert howItWorksExporter != null;
        assertEquals("how it works title description", howItWorksExporter.getDescription());
        assertEquals("lebara/components/howitworks", howItWorksExporter.getExportedType());
    }

}