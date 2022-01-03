package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PersonalDetailsExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/personal-details/jcr:content/root/responsivegrid/personaldetails";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/personal-details.json", "/content/lebara/de/de/personal-details");
    }

    @Test
    void getCitiesTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        PersonalDetailsExporter personalDetailsExporter = aemContext.request().adaptTo(PersonalDetailsExporter.class);
        personalDetailsExporter.getCities();
        personalDetailsExporter.getExportedType();
    }

}