package com.lebara.core.models;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PostpaidPersonalDetailsExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/postpaid-personal-details/jcr:content/root/responsivegrid/postpaidpersonaldeta";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(PostpaidPersonalDetailsExporter.class);
        aemContext.load().json("/postpaid-personal-details.json", "/content/lebara/de/de/postpaid-personal-details");
    }

    @Test
    void getHeadingTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        PostpaidPersonalDetailsExporter postpaidPersonalDetailsExporter = aemContext.request().adaptTo(PostpaidPersonalDetailsExporter.class);
        postpaidPersonalDetailsExporter.getHeading();
        postpaidPersonalDetailsExporter.getExportedType();
        postpaidPersonalDetailsExporter.getFrmFields();
        postpaidPersonalDetailsExporter.getValidationMessages();
        postpaidPersonalDetailsExporter.getPortingSectionHeading();
    }

}