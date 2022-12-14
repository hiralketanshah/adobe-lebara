package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PromoBannerSmallExporterTest {
    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/promo-banner/jcr:content/root/responsivegrid/promobannersmall";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/promo-banner-small.json", "/content/lebara/de/de/promo-banner");
    }
    @Test
    void getHeadingTextTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        PromoBannerSmallExporter promoBannerSmallExporter = aemContext.request().adaptTo(PromoBannerSmallExporter.class);
        promoBannerSmallExporter.getSubHeadingText();
        promoBannerSmallExporter.getKnowMoreButtonText();
        promoBannerSmallExporter.getPromoText();
        promoBannerSmallExporter.getExportedType();
        promoBannerSmallExporter.getHeadingText();
    }
}