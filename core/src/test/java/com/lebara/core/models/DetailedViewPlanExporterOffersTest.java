package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DetailedViewPlanExporterOffersTest {

    private final AemContext aemContext = new AemContext();
    private static final String OFFERS_JSON = "/content/lebara/de/de/detailed-viewplan-test/jcr:content/root/responsivegrid/detailedviewplans";

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private Resource resource;

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(DetailedViewPlanExporter.class);
    }

    @Test
    void getProductOffers() {
        aemContext.load().json("/detailed-view-plan.json", "/content/lebara/de/de/detailed-viewplan-test");
        aemContext.currentResource(OFFERS_JSON);
        DetailedViewPlanExporter detailedViewPlanExporter = aemContext.request().adaptTo(DetailedViewPlanExporter.class);
        detailedViewPlanExporter.getOffers();
    }
}