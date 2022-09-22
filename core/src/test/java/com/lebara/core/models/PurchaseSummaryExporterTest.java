package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
@TestInstance(value = Lifecycle.PER_CLASS)
public class PurchaseSummaryExporterTest {

	private final AemContext aemContext = new AemContext();
	PurchaseSummaryExporter purchaseSummaryExporter = new PurchaseSummaryExporter();
	
	 @BeforeAll
	 void setUpBeforeClass() {
        aemContext.load().json("/purchasesummary-component.json", "/purchasesummary");
        aemContext.currentResource("/purchasesummary");
        purchaseSummaryExporter = aemContext.request().adaptTo(PurchaseSummaryExporter.class);
	}
	@Test
    void testGetTitle() {
		assertEquals("Sim Only 24 Months", purchaseSummaryExporter.getTitle());
	}
    
    @Test
    void testGetButtonLabel() {
    	assertEquals("Order Now", purchaseSummaryExporter.getButtonLabel());
    }
    
    @Test
    void testGetEditLabel() {
    	assertEquals("Edit", purchaseSummaryExporter.getEditLabel());
    }
    
    @Test
    void testGetEditCTALink() {
    	assertEquals("en/postpaid.html", purchaseSummaryExporter.getEditCTALink());
    }
    
    @Test
    void testGetBusinessSubscriptionLabel() {
    	assertEquals("Business Subscription", purchaseSummaryExporter.getBusinessSubscriptionLabel());
    }
    
    @Test
    void testGetInitialDiscountHeaderLabel() {
    	assertEquals("The first 6 months", purchaseSummaryExporter.getInitialDiscountHeaderLabel());
    }
    
    @Test
    void testGetAfterDiscountLabel() {
    	assertEquals("After per month", purchaseSummaryExporter.getAfterDiscountLabel());
    }
    
    @Test
    void testGetActivationFeeLabel() {
    	assertEquals("Activation Fee", purchaseSummaryExporter.getActivationFeeLabel());
    }
    
    @Test
    void testGetDiscountLabel() {
    	assertEquals("Discount", purchaseSummaryExporter.getDiscountLabel());
    }
    
    @Test
    void testGetAppliedStyles() {
        assertEquals("", purchaseSummaryExporter.getAppliedStyles());
    }
    
    @Test
    void testGetExportedType() {
        assertEquals(PurchaseSummaryExporter.RESOURCE_TYPE, purchaseSummaryExporter.getExportedType());
    }
}
