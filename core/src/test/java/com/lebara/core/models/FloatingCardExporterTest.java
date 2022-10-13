package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
public class FloatingCardExporterTest {

    private final AemContext aemContext = new AemContext();

    FloatingCardExporter floatingCardExporter;

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/floatingcard-component.json", "/floatingcard");
        aemContext.currentResource("/floatingcard");
        floatingCardExporter = aemContext.request().adaptTo(FloatingCardExporter.class);
    }

    @Test
    public void testGetStickyPromoLabel() {
        assertEquals("First 3 months for free", floatingCardExporter.getStickyPromoLabel());
    }

    @Test
    public void testGetStickyActivationFeeLabel() {
        assertEquals("Activation fee", floatingCardExporter.getStickyActivationFeeLabel());
    }

    @Test
    public void testGetStickyTotalLabel() {
        assertEquals("Per month", floatingCardExporter.getStickyTotalLabel());
    }

    @Test
    public void testGetButtonLabel() {
        assertEquals("Renew Now", floatingCardExporter.getButtonLabel());
    }

    @Test
    public void testGetButtonCTALink() {
        assertEquals("/en/home.html", floatingCardExporter.getButtonCTALink());
    }

    @Test
    void testGetIsActivationFeeDiscount() {
        assertTrue(floatingCardExporter.getIsActivationFeeDiscount());
    }

    @Test
    public void testGetActivationFeeValue() {
        assertEquals("1500", floatingCardExporter.getActivationFeeValue());
    }

    @Test
    public void testGetAppliedStyles() {
        assertEquals("", floatingCardExporter.getAppliedStyles());
    }

    @Test
    public void testGetExportedType() {
        assertEquals(FloatingCardExporter.RESOURCE_TYPE, floatingCardExporter.getExportedType());
    }

}