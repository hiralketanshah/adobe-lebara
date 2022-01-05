package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HelpCenterFaqExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/helpcenter/jcr:content/root/responsivegrid/faq";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/helpcenter.json", "/content/lebara/de/de/helpcenter");
    }

    @Test
    void getReadMoreLabelTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        HelpCenterFaqExporter helpCenterFaqExporter = aemContext.request().adaptTo(HelpCenterFaqExporter.class);
        helpCenterFaqExporter.getFaqPages();
        helpCenterFaqExporter.getReadMoreLabel();
        helpCenterFaqExporter.getExportedType();
    }
}