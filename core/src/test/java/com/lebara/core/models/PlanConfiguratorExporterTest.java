package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
class PlanConfiguratorExporterTest {

    private final AemContext aemContext = new AemContext();
    PlanConfiguratorExporter planConfiguratorExporter = new PlanConfiguratorExporter();

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/planconfigurator-component.json", "/planconfigurator");
        aemContext.currentResource("/planconfigurator");
        planConfiguratorExporter = aemContext.request().adaptTo(PlanConfiguratorExporter.class);
    }

    @Test
    void testGetPromotionalLabel() {
        assertEquals("6 Months 50% Off", planConfiguratorExporter.getPromotionalLabel());
    }

    @Test
    void testGetMostPopularLabel() {
        assertEquals("Most Popular", planConfiguratorExporter.getMostPopularLabel());
    }
    
    @Test
    void testGetMostPopularBundleId() {
        assertEquals("bundle1", planConfiguratorExporter.getMostPopularBundleId());
    }

    @Test
    void testGetInfoPopupCloseLabel() {
        assertEquals("Close", planConfiguratorExporter.getInfoPopupCloseLabel());
    }

    @Test
    void testGetExtraOptionLabel() {
        assertEquals("Extra Option", planConfiguratorExporter.getExtraOptionLabel());
    }

    @Test
    void testGetDurationLabel() {
        assertEquals("Duration", planConfiguratorExporter.getDurationLabel());
    }

    @Test
    void testGetDurationPopupHeading() {
        assertEquals("Duration", planConfiguratorExporter.getDurationPopupHeading());
    }

    @Test
    void testGetDurationPopupInfo() {
        assertEquals("Test Content", planConfiguratorExporter.getDurationPopupInfo());
    }

    @Test
    void testGetOneMonthTitle() {
        assertEquals("1 Month", planConfiguratorExporter.getOneMonthTitle());
    }

    @Test
    void testGetOneMonthDescription() {
        assertEquals("Without Fixed Term", planConfiguratorExporter.getOneMonthDescription());
    }

    @Test
    void testGetTwentyFourMonthsTitle() {
        assertEquals("12 Months", planConfiguratorExporter.getTwentyFourMonthsTitle());
    }

    @Test
    void testGetTwentyFourMonthsDescription() {
        assertEquals("Be flexible & save 2€ monthly", planConfiguratorExporter.getTwentyFourMonthsDescription());
    }

    @Test
    void testGetBundleLabel() {
        assertEquals("Bundle", planConfiguratorExporter.getBundleLabel());
    }

    @Test
    void testGetBundlePopupHeading() {
        assertEquals("Bundle", planConfiguratorExporter.getBundlePopupHeading());
    }

    @Test
    void testGetBundlePopupInfo() {
        assertEquals("Test Content", planConfiguratorExporter.getBundlePopupInfo());
    }

    @Test
    void testGetCallingAndtextingLabel() {
        assertEquals("Calling & Texting", planConfiguratorExporter.getCallingAndtextingLabel());
    }

    @Test
    void testGetCallingtextingPopupHeading() {
        assertEquals("Calling & Texting", planConfiguratorExporter.getCallingtextingPopupHeading());
    }

    @Test
    void testGetCallingtextingPopupInfo() {
        assertEquals("Test Content", planConfiguratorExporter.getCallingtextingPopupInfo());
    }

    @Test
    void testGetUnlimitedMinsSmsText() {
        assertEquals("Unlimited min/text", planConfiguratorExporter.getUnlimitedMinsSmsText());
    }

    @Test
    void testGetSpeedLabel() {
        assertEquals("Speed", planConfiguratorExporter.getSpeedLabel());
    }

    @Test
    void testGetSpeedPopupHeading() {
        assertEquals("Speed", planConfiguratorExporter.getSpeedPopupHeading());
    }

    @Test
    void testGetSpeedPopupInfo() {
        assertEquals("Test Content", planConfiguratorExporter.getSpeedPopupInfo());
    }

    @Test
    void testGetInternationalCallingLabel() {
        assertEquals("International Calling", planConfiguratorExporter.getInternationalCallingLabel());
    }

    @Test
    void testGetInternationalCallingPopupHeading() {
        assertEquals("International Calling", planConfiguratorExporter.getInternationalCallingPopupHeading());
    }

    @Test
    void testGetInternationalCallingPopupInfo() {
        assertEquals("Test Content", planConfiguratorExporter.getInternationalCallingPopupInfo());
    }

    @Test
    void testGetUnlimitedCallsSmsText() {
        assertEquals("Unlimited Calling & Texting", planConfiguratorExporter.getUnlimitedCallsSmsText());
    }

    @Test
    void testGetUnlimitedCallsSmsDescription() {
        assertEquals("45 Countries", planConfiguratorExporter.getUnlimitedCallsSmsDescription());
    }

    @Test
    void testGetExportedType() {
        assertEquals(PlanConfiguratorExporter.RESOURCE_TYPE, planConfiguratorExporter.getExportedType());
    }

}
