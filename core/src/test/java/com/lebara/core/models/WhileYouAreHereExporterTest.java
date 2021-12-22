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
class WhileYouAreHereExporterTest {

    private final AemContext aemContext=new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/whileyouarehere";

    @InjectMocks
    WhileYouAreHereExporter whileYouAreHereExporter = new WhileYouAreHereExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(WhileYouAreHereExporter.class);
        aemContext.load().json("/page.json","/content");
    }

    @Test
    void getCtaLiveChatLabel() {
        aemContext.currentResource(PROPERTIES_JSON);
        whileYouAreHereExporter = aemContext.request().adaptTo(WhileYouAreHereExporter.class);
        assert whileYouAreHereExporter != null;
        assertEquals("START LIVE CHAT", whileYouAreHereExporter.getCtaLiveChatLabel());
        assertEquals("www.google.com", whileYouAreHereExporter.getCtaLiveChatUrl());
        assertEquals("OR", whileYouAreHereExporter.getSeparatorOrText());
        assertEquals("lebara/components/whileyouarehere", whileYouAreHereExporter.getExportedType());
    }
}