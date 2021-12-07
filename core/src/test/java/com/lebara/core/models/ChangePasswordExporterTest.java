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
class ChangePasswordExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/changepassword";

    @InjectMocks
    ChangePasswordExporter changePasswordExporter = new ChangePasswordExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(FaqExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getChangePasswordHeading() {
        aemContext.currentResource(PROPERTIES_JSON);
        changePasswordExporter = aemContext.request().adaptTo(ChangePasswordExporter.class);
        assertEquals("Change Password", changePasswordExporter.getChangePasswordHeading());
        assertEquals("lebara/components/user/changepassword", changePasswordExporter.getExportedType());
    }

    @Test
    void getFrmFields() {
        aemContext.currentResource(PROPERTIES_JSON);
        changePasswordExporter = aemContext.request().adaptTo(ChangePasswordExporter.class);
        assertEquals("Change Password", changePasswordExporter.getFrmFields());
    }

    @Test
    void getExportedType() {
    }
}