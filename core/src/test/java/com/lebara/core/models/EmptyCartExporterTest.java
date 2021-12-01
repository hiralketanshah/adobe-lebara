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
class EmptyCartExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/page3";

    @InjectMocks
    EmptyCartExporter emptyCartExporter = new EmptyCartExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(EmptyCartExporter.class);
        aemContext.load().json("/page.json", "/content");
    }


    @Test
    void getContinueBrowsinglink() {
        aemContext.currentResource(PROPERTIES_JSON);
        emptyCartExporter = aemContext.request().adaptTo(EmptyCartExporter.class);
        assertEquals("lebara/components/emptycart", emptyCartExporter.getExportedType());
        assertEquals("cartDescription", emptyCartExporter.getCartDescription());
        assertEquals("shopBuyLabel", emptyCartExporter.getShopBuyLabel());
        assertEquals("addOnTabLabel", emptyCartExporter.getAddOnTabLabel());
        assertEquals("dataTabLabel", emptyCartExporter.getDataTabLabel());
        assertEquals("plansTabLabel", emptyCartExporter.getPlansTabLabel());
        assertEquals("showDetailsLabel", emptyCartExporter.getShowDetailsLabel());
        assertEquals("buyPlanLabel", emptyCartExporter.getBuyPlanLabel());
        assertEquals("addToCartLabel", emptyCartExporter.getAddToCartLabel());
        assertEquals("continueBrowsingLabel", emptyCartExporter.getContinueBrowsingLabel());
        assertEquals("goBackText", emptyCartExporter.getGoBackText());
        assertEquals("emptyBasketText", emptyCartExporter.getEmptyBasketText());
        assertEquals("continueBrowsinglink", emptyCartExporter.getContinueBrowsinglink());
        assertEquals(false, emptyCartExporter.isFullWidth());

    }
}