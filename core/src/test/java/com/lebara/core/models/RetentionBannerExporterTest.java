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
public class RetentionBannerExporterTest {

    private final AemContext aemContext = new AemContext();

    RetentionBannerExporter retentionBannerExporter;

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/retentionbanner-component.json", "/retentionbanner");
        aemContext.currentResource("/retentionbanner");
        retentionBannerExporter = aemContext.request().adaptTo(RetentionBannerExporter.class);
    }

    @Test
    public void testGetTitle() {
        assertEquals("Switch now and get 3months free!", retentionBannerExporter.getTitle());
    }

    @Test
    public void testGetDescription() {
        assertEquals("test", retentionBannerExporter.getDescription());
    }

    @Test
    public void testGetCtaLink() {
        assertEquals("/en/home.html", retentionBannerExporter.getCtaLink());
    }

    @Test
    public void testGetCtaLabel() {
        assertEquals("Renew Now", retentionBannerExporter.getCtaLabel());
    }

    @Test
    public void testGetFreeGBText() {
        assertEquals("Upto 2GBs for Free", retentionBannerExporter.getFreeGBText());
    }

    @Test
    public void testGetUsertype() {
        assertEquals("allNonLoggedIn", retentionBannerExporter.getUserType());
    }

    @Test
    public void testGetAppliedStyles() {
        assertEquals("", retentionBannerExporter.getAppliedStyles());
    }

    @Test
    public void testGetExportedType() {
        assertEquals(RetentionBannerExporter.RESOURCE_TYPE, retentionBannerExporter.getExportedType());
    }

}
