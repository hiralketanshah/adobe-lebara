package com.lebara.core.models;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import com.adobe.cq.wcm.core.components.models.Button;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
public class ButtonExporterTest {

	private final AemContext aemContext = new AemContext();
	ButtonExporter buttonExporter = new ButtonExporter();
	
	@BeforeAll
	 void setUpBeforeClass() {
       aemContext.load().json("/button-component.json", "/button");
       aemContext.currentResource("/button");
       buttonExporter = aemContext.request().adaptTo(ButtonExporter.class);
	}
	
	@Test
	void testGetText() {
		assertEquals("Continue", buttonExporter.getText());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getLink()}.
	 */
	@Test
	void testGetLink() {
		assertEquals("/en/cart/lebara-sim-choice.html", buttonExporter.getLink());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getOpenInNewTab()}.
	 */
	@Test
	void testGetOpenInNewTab() {
		assertEquals(true, buttonExporter.getOpenInNewTab());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getButtonStyle()}.
	 */
	@Test
	void testGetButtonStyle() {
		assertEquals("solid", buttonExporter.getButtonStyle());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getButtonBackgroundColor()}.
	 */
	@Test
	void testGetButtonBackgroundColor() {
		assertEquals("rgb(127,166,235)", buttonExporter.getButtonBackgroundColor());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getButtonHoverBgColor()}.
	 */
	@Test
	void testGetButtonHoverBgColor() {
		assertEquals("rgb(255,255,217)", buttonExporter.getButtonHoverBgColor());
	}

	/**
	 * Test method for {@link com.lebara.core.models.ButtonExporter#getExportedType()}.
	 */
	@Test
	void testGetExportedType() {
		assertEquals("lebara/components/button", buttonExporter.getExportedType());
	}
}
