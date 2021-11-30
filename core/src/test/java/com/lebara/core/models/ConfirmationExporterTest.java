package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ConfirmationExporterTest {

    private final AemContext aemContext=new AemContext();

    @InjectMocks
    ConfirmationExporter confirmationExporter = new ConfirmationExporter();

    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/embed1";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(ConfirmationExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    final void getBackgroundImage(){
        aemContext.currentResource(PROPERTIES_JSON);
        confirmationExporter = aemContext.request().adaptTo(ConfirmationExporter.class);
        assertEquals("thankYouMessage", confirmationExporter.getThankYouMessage());
        assertEquals("lebara/resourceType", confirmationExporter.getExportedType());
    }
}