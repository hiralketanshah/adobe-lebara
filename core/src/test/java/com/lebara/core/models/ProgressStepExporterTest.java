package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ProgressStepExporterTest {
    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/progress-step/jcr:content/root/responsivegrid/progressstep";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(ProgressStepExporter.class);
        aemContext.load().json("/progress-step.json", "/content/lebara/de/de/progress-step");
    }
    @Test
    void init() {
        aemContext.currentResource(PROPERTIES_JSON);
        ProgressStepExporter progressStepExporter = aemContext.request().adaptTo(ProgressStepExporter.class);
        progressStepExporter.getPageLinks();
        progressStepExporter.getActiveStepIndex();
        progressStepExporter.getIsSmallWidth();
        progressStepExporter.getIsWhiteBackground();
        progressStepExporter.getExportedType();
    }
}