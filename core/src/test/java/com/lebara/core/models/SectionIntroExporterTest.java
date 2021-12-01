package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class SectionIntroExporterTest {

	private final AemContext aemContext = new AemContext();
	private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/simportin";

	@InjectMocks
	SectionIntroExporter sectionIntroExporter = new SectionIntroExporter();

	@BeforeEach
	void setUp() {
		aemContext.addModelsForClasses(SectionIntroExporter.class);
		aemContext.load().json("/page.json", "/content");
	}

	@Test
	void getSectionHeading() {
		aemContext.currentResource(PROPERTIES_JSON);
		sectionIntroExporter = aemContext.request().adaptTo(SectionIntroExporter.class);
		assertEquals("linkLabel", sectionIntroExporter.getLinkLabel());
		assertEquals("sectionSubHeading", sectionIntroExporter.getSectionSubHeading());
		assertEquals("lebara/components/page", sectionIntroExporter.getExportedType());
		assertEquals(false, sectionIntroExporter.isNoPadding());
		assertEquals("sectionHeading", sectionIntroExporter.getSectionHeading());
	}
}