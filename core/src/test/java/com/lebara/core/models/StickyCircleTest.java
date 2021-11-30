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
class StickyCircleTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/embed1";

    @InjectMocks
    StickyCircle stickyCircle = new StickyCircle();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(StickyCircle.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    void getExportedType() {
        aemContext.currentResource(PROPERTIES_JSON);
        stickyCircle = aemContext.request().adaptTo(StickyCircle.class);
        assertEquals("lebara/resourceType", stickyCircle.getExportedType());
        assertEquals("linkLabel", stickyCircle.getLinkLabel());
    }

}