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
class TrustPilotExporterTest {

    private final AemContext aemContext = new AemContext();
    TrustPilotExporter trustPilotExporter = new TrustPilotExporter();

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/trustpilot-component.json", "/trustpilot");
        aemContext.currentResource("/trustpilot");
        trustPilotExporter = aemContext.request().adaptTo(TrustPilotExporter.class);
    }

    @Test
    void testGetTitle() {
        assertEquals("Our Customers Say", trustPilotExporter.getTitle());
    }

    @Test
    void testGetDesktopReviewCount() {
        assertEquals(4, trustPilotExporter.getDesktopReviewCount());
    }

    @Test
    void testGetTrustPilotBarLink() {
        assertEquals("/en/home.html", trustPilotExporter.getTrustPilotBarLink());
    }

    @Test
    void testGetExportedType() {
        assertEquals(TrustPilotExporter.RESOURCE_TYPE, trustPilotExporter.getExportedType());
    }

}
