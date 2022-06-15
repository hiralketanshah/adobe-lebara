package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GetItNowExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/getitnow";

    @InjectMocks
    GetItNowExporter getItNowExporter = new GetItNowExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(GetItNowExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getImagePath() {
        aemContext.currentResource(PROPERTIES_JSON);
        getItNowExporter = aemContext.request().adaptTo(GetItNowExporter.class);
        assertEquals("/content/dam/lebara/global/footer-bg.jpeg", getItNowExporter.getImagePath());
        assertEquals("Title", getItNowExporter.getTitle());
        assertEquals("get it now", getItNowExporter.getButtonCTALabel());
        assertEquals("get it now error message", getItNowExporter.getGetItNowErrorMessage());
        assertEquals("/content/lebara/de/en/SIMONLY/phone.html", getItNowExporter.getButtonCTALink());
        assertEquals("lebara/components/getitnow", getItNowExporter.getExportedType());
        assertEquals(false, getItNowExporter.getIsSimChoiceFlow());
    }
}