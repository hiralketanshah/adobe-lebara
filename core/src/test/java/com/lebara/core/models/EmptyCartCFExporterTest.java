package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class EmptyCartCFExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/empty-cart/jcr:content/root/responsivegrid/emptycart";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(WhereToCallExporter.class);
        aemContext.load().json("/empty-cart.json", "/content/lebara/de/de/empty-cart");
    }

    @Test
    void getEmptyCart() {
        aemContext.currentResource(PROPERTIES_JSON);
        EmptyCartExporter emptyCartExporter = aemContext.request().adaptTo(EmptyCartExporter.class);
        emptyCartExporter.getAddOnOffers();
        emptyCartExporter.getDataOffers();
        emptyCartExporter.getPlanOffers();
    }
}
