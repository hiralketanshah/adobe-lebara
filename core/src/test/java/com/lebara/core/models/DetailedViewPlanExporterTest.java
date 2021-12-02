package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DetailedViewPlanExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/detailedViewPlanExporter";

    @InjectMocks
    DetailedViewPlanExporter detailedViewPlanExporter = new DetailedViewPlanExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(EmptyCartExporter.class);
        aemContext.load().json("/page.json", "/content");
    }
    @Test
    void getProductInformationFile() {
        aemContext.currentResource(PROPERTIES_JSON);
        detailedViewPlanExporter = aemContext.request().adaptTo(DetailedViewPlanExporter.class);
        assertEquals("lebara/resourceType", detailedViewPlanExporter.getExportedType());
        assertEquals("title", detailedViewPlanExporter.getTitle());
        assertEquals("heading", detailedViewPlanExporter.getHeading());
        assertEquals("subTitle", detailedViewPlanExporter.getSubTitle());
        assertEquals("description", detailedViewPlanExporter.getDescription());
        assertEquals("showLabel", detailedViewPlanExporter.getShowLabel());
        assertEquals("hideLabel", detailedViewPlanExporter.getHideLabel());
        assertEquals("ctaTopLabel", detailedViewPlanExporter.getCtaTopLabel());
        assertEquals("ctaBottomLabel", detailedViewPlanExporter.getCtaBottomLabel());
        assertEquals("backgroundColor", detailedViewPlanExporter.getBackgroundColor());
        assertEquals("product.information.label", detailedViewPlanExporter.getProductInformationFile());
    }
}