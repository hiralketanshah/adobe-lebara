package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AwardExporterTest {

    private final AemContext aemContext=new AemContext();

    @InjectMocks
    AwardExporter awardExporter = new AwardExporter();

    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/page1";

    List<String> list  = new ArrayList<>();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(ConfirmationExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    final void getBackgroundImage(){
        aemContext.currentResource(PROPERTIES_JSON);
        awardExporter = aemContext.request().adaptTo(AwardExporter.class);
        list.add("value1");
        list.add("value2");
        assertEquals(null, awardExporter.getAwards());
        assertEquals("title", awardExporter.getTitle());
        assertEquals("lebara/components/awards", awardExporter.getExportedType());
    }
}