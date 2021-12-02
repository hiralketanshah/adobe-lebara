package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FaqExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/faqExporter";

    @InjectMocks
    FaqExporter faqExporter = new FaqExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    final void getBackgroundImage(){
        aemContext.currentResource(PROPERTIES_JSON);
        faqExporter = aemContext.request().adaptTo(FaqExporter.class);
        assertEquals("lebara/components/faq", faqExporter.getExportedType());
        assertEquals("backgroundColor", faqExporter.getBackgroundColor());
    }
}