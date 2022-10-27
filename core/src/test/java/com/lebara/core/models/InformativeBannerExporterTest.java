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
public class InformativeBannerExporterTest {

    private final AemContext aemContext = new AemContext();

    InformativeBannerExporter informativeBannerExporter;

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/informativebanner-component.json", "/informativebanner");
        aemContext.currentResource("/informativebanner");
        informativeBannerExporter = aemContext.request().adaptTo(InformativeBannerExporter.class);
    }

    @Test
    public void testGetImage() {
        assertEquals("/content/dam/lebara/global/retentionConfiguratorBannerImg.png",
                informativeBannerExporter.getImage());
    }

    @Test
    public void testGetAlt() {
        assertEquals("Alt", informativeBannerExporter.getAlt());
    }

    @Test
    public void testGetLinkURL() {
        assertEquals("/en/sim-only.html", informativeBannerExporter.getLinkURL());
    }

    @Test
    public void testGetTitle() {
        assertEquals("Time to renew!", informativeBannerExporter.getTitle());
    }

    @Test
    public void testGetSubTitle() {
        assertEquals("First 3 months are free of change!", informativeBannerExporter.getSubTitle());
    }

    @Test
    public void testGetDescription() {
        assertEquals("test", informativeBannerExporter.getDescription());
    }

    @Test
    public void testGetCtaLink() {
        assertEquals("/en/sim-only.html", informativeBannerExporter.getCtaLink());
    }

    @Test
    public void testGetCtaLabel() {
        assertEquals("Renew", informativeBannerExporter.getCtaLabel());
    }

    @Test
    public void testGetCtaColor() {
        assertEquals("#FF3182", informativeBannerExporter.getCtaColor());
    }

    @Test
    public void testGetTextColor() {
        assertEquals("#FFFFFF", informativeBannerExporter.getTextColor());
    }

    @Test
    public void testGetBackgroundColor() {
        assertEquals("#1978CD", informativeBannerExporter.getBackgroundColor());
    }

    @Test
    public void testGetAppliedStyles() {
        assertEquals("", informativeBannerExporter.getAppliedStyles());
    }

    @Test
    public void testGetExportedType() {
        assertEquals(InformativeBannerExporter.RESOURCE_TYPE, informativeBannerExporter.getExportedType());
    }
}
