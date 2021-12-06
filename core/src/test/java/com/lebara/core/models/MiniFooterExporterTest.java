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
class MiniFooterExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/miniFooterExporter";

    @InjectMocks
    MiniFooterExporter miniFooterExporter = new MiniFooterExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    final void getBackgroundImage() {
        aemContext.currentResource(PROPERTIES_JSON);
        miniFooterExporter = aemContext.request().adaptTo(MiniFooterExporter.class);
        assertEquals("lebara/components/mini-footer", miniFooterExporter.getExportedType());
        assertEquals("helpText", miniFooterExporter.getHelpText());
        assertEquals("lookText", miniFooterExporter.getLookText());
    }
}