package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
    void testButtonCTALink() {
    	assertEquals("en/postpaid/details.html", purchaseSummaryExporter.getButtonCTALink());
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
    void testGetMonthText() {
    	assertEquals("Month", purchaseSummaryExporter.getMonthText());
    }
    
    @Test
    void testGetMonthsText() {
        assertEquals("Months", purchaseSummaryExporter.getMonthsText());
    }
    
    @Test
    void testGetTotalLabel() {
        assertEquals("Per Month", purchaseSummaryExporter.getTotalLabel());
    }
    
    @Test
    void testGetIsActivationFeeDiscount() {
        assertTrue(purchaseSummaryExporter.getIsActivationFeeDiscount());
    }
    
    @Test
    void testGetActivationFeeValue() {
        assertEquals("1500", purchaseSummaryExporter.getActivationFeeValue());
    }
    
    @Test
    void testGetHeaderLabel() {
        assertEquals("Your Orders", purchaseSummaryExporter.getHeaderLabel());
    }
    
    @Test
    void testGetAppliedStyles() {
        assertEquals("", purchaseSummaryExporter.getAppliedStyles());
    }
    
    @Test
    void testGetIsRetentionGrandTotal() {
        assertEquals(false, purchaseSummaryExporter.getIsRetentionGrandTotal());
    }
    
    @Test
    public void testGetStickyPromoLabel() {
        assertEquals("First 3 months for free", purchaseSummaryExporter.getStickyPromoLabel());
    }

    @Test
    public void testGetStickyActivationFeeLabel() {
        assertEquals("Activation fee", purchaseSummaryExporter.getStickyActivationFeeLabel());
    }

    @Test
    public void testGetStickyTotalLabel() {
        assertEquals("Per month", purchaseSummaryExporter.getStickyTotalLabel());
    }

    @Test
    public void testGetTermsAndConditionsContent() {
        assertEquals("test", purchaseSummaryExporter.getTermsAndConditionsContent());
    }
    
    @Test
    public void testGetContractSummaryLabel() {
        assertEquals("Contract", purchaseSummaryExporter.getContractSummaryLabel());
    }
    
    @Test
    public void testGetContractSummaryPdfRootPath() {
        assertEquals("#", purchaseSummaryExporter.getContractSummaryPdfRootPath());
    }
    
    @Test
    public void testGetPdfDownloadLabel() {
        assertEquals("download", purchaseSummaryExporter.getPdfDownloadLabel());
    }
    
    @Test
    public void testGetPdfCloseLabel() {
        assertEquals("close", purchaseSummaryExporter.getPdfCloseLabel());
    }
    
    @Test
    void testGetExportedType() {
        assertEquals(PurchaseSummaryExporter.RESOURCE_TYPE, purchaseSummaryExporter.getExportedType());
    }
}
