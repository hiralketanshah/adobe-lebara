package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import com.lebara.core.models.beans.IconTextBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
public class IconTextListExporterTest {
	private final AemContext aemContext = new AemContext();
	IconTextListExporter iconTextListExporter = new IconTextListExporter();
	
	@BeforeAll
    void setUpBeforeClass() {
        aemContext.load().json("/icontextlist-component.json", "/icontextlist");
        aemContext.currentResource("/icontextlist");
        iconTextListExporter = aemContext.request().adaptTo(IconTextListExporter.class);
    }
	
	@Test
	void testGetListData() {
		List<IconTextBean> icontext = iconTextListExporter.getListData();
		
		assertEquals(0, icontext.get(0).getId());
		assertEquals("/content/dam/lebara/netherlands/free-icon.png", icontext.get(0).getIcon());
		assertEquals("Free number porting", icontext.get(0).getText());
	}
	
    @Test
    void testGetAppliedStyles() {
        assertEquals("", iconTextListExporter.getAppliedStyles());
    }
    
	@Test
    void testGetExportedType() {
        assertEquals(IconTextListExporter.RESOURCE_TYPE, iconTextListExporter.getExportedType());
    }
	
}
