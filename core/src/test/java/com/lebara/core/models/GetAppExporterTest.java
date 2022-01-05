package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GetAppExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/get-app/jcr:content/root/responsivegrid/getapp";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/get-app.json", "/content/lebara/de/de/get-app");
    }

    @Test
    void getTextDescriptionTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        GetAppExporter getAppExporter = aemContext.request().adaptTo(GetAppExporter.class);
        getAppExporter.getTextDescription();
        getAppExporter.isShow();
        getAppExporter.getBackgroundImageDesktop();
        getAppExporter.getBackgroundImageMobile();
        getAppExporter.getLinks();
        getAppExporter.getAppTitle();
        getAppExporter.getGetAppLabel();
        getAppExporter.getBackgroundColor();
        getAppExporter.getTextCol1();
        getAppExporter.getTextCol2();
        getAppExporter.getExportedType();
    }
}