package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ReviewExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/review/jcr:content/root/responsivegrid/review";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/review.json", "/content/lebara/de/de/review");
    }

    @Test
    void test() {
        aemContext.currentResource(PROPERTIES_JSON);
        ReviewExporter reviewExporter = aemContext.request().adaptTo(ReviewExporter.class);
        reviewExporter.getExportedType();
    }
}