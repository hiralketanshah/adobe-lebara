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
class BannerExporterTest {

    private final AemContext aemContext = new AemContext();

    @InjectMocks
    BannerExporter bannerExporter = new BannerExporter();

    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/page1";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(BannerExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    final void getBackgroundImage() {
        aemContext.currentResource(PROPERTIES_JSON);
        bannerExporter = aemContext.request().adaptTo(BannerExporter.class);
        assertEquals("backgroundImage", bannerExporter.getBackgroundImage());
        assertEquals("title", bannerExporter.getTitle());
        assertEquals("knowMoreText", bannerExporter.getKnowMoreText());
        assertEquals("knowMoreLink", bannerExporter.getKnowMoreLink());
        assertEquals("lebara/resourceType", bannerExporter.getExportedType());
    }
}