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
class InformativeCardExporterTest {

    private final AemContext aemContext = new AemContext();

    InformativeCardExporter informativeCardExporter;

    @BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/informativecard-component.json", "/informativecard");
        aemContext.currentResource("/informativecard");
        informativeCardExporter = aemContext.request().adaptTo(InformativeCardExporter.class);
    }

    @Test
    void testGetSrc() {
        assertEquals("/content/dam/lebara/global/BlogBanner.png", informativeCardExporter.getSrc());
    }

    @Test
    void testGetLinkURL() {
        assertEquals("/en/3300151.html", informativeCardExporter.getLinkURL());
    }

    @Test
    void testGetAlign() {
        assertEquals("center", informativeCardExporter.getAlign());
    }

    @Test
    void testGetWidth() {
        assertEquals("600px", informativeCardExporter.getWidth());
    }
    
    @Test
    void testGetBoxBgColor() {
        assertEquals("#0074D9", informativeCardExporter.getBoxBgColor());
    }


    @Test
    void testGetHeading() {
        assertEquals("Questions about ordering?", informativeCardExporter.getHeading());
    }

    @Test
    void testGetHelplineNumber() {
        assertEquals("+3120-8945548", informativeCardExporter.getHelplineNumber());
    }

    @Test
    void testGetMoreInfo() {
        assertEquals("Available on working days from 9 a.m. - 5 p.m. And on Saturday from 10 a.m. - 4 p.m.",
                informativeCardExporter.getMoreInfo());
    }

    @Test
    void testGetExportedType() {
        assertEquals(InformativeCardExporter.RESOURCE_TYPE, informativeCardExporter.getExportedType());
    }

}
