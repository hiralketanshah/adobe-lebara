package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
class DashboardPlansExporterTest {

    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/dashboardplans";

    private final AemContext aemContext = new AemContext();
    DashboardPlansExporter dashboardPlansExporter;

    @BeforeEach
    void setUp() {

        aemContext.load().json("/dashboardplans-component.json", "/dashboardplans");
        aemContext.currentResource("/dashboardplans");
        dashboardPlansExporter = aemContext.request().adaptTo(DashboardPlansExporter.class);
    }

    @Test
    void testGetExportedType() {
        assertEquals(DashboardPlansExporterTest.RESOURCE_TYPE, dashboardPlansExporter.getExportedType());
    }

    @Test
    void testGetButtonLabel() {
        assertEquals("Manage", dashboardPlansExporter.getButtonLabel());
    }

    @Test
    void testGetAutoRenewLabel() {
        assertEquals("Automatic renewal", dashboardPlansExporter.getAutoRenewLabel());
    }

    @Test
    void testGetRenewalLabel() {
        assertEquals("next renewal on ", dashboardPlansExporter.getRenewalLabel());
    }

    @Test
    void testGetAutoRenewDesc() {
        assertEquals("will be renewed again in {0} days", dashboardPlansExporter.getAutoRenewDesc());
    }

    @Test
    void testGetAutoRenewTurnOnLabel() {
        assertEquals("Turn on auto-renewal", dashboardPlansExporter.getAutoRenewTurnOnLabel());
    }

    @Test
    void testGetButtonText() {
        assertEquals("Buy again", dashboardPlansExporter.getButtonText());
    }

    @Test
    void testGetCancelLabel() {
        assertEquals("Cancel request", dashboardPlansExporter.getCancelLabel());
    }

    @Test
    void testGetPlanChangeMessage() {
        assertEquals("test", dashboardPlansExporter.getPlanChangeMessage());
    }

    @Test
    void testGetManageLabel() {
        assertEquals("Manage", dashboardPlansExporter.getManageLabel());
    }

    @Test
    void testGetCancelChangePlanHeading() {
        assertEquals("Bundle Change", dashboardPlansExporter.getCancelChangePlanHeading());
    }

    @Test
    void testGetCancelChangePlanSubHeading() {
        assertEquals("Are you sure you want to cancel the switch to the {0}GB bundle ?",
                dashboardPlansExporter.getCancelChangePlanSubHeading());
    }

    @Test
    void testGetCancelChangePlanCheckboxTop() {
        assertEquals("Test", dashboardPlansExporter.getCancelChangePlanCheckboxTop());
    }

    @Test
    void testGetCancelChangePlanCheckboxBottom() {
        assertEquals("I confirm", dashboardPlansExporter.getCancelChangePlanCheckboxBottom());
    }

    @Test
    void testGetCancelChangePlanConfirmLabel() {
        assertEquals("Confirm", dashboardPlansExporter.getCancelChangePlanConfirmLabel());
    }

    @Test
    void testGetCancelChangePlanCancelLabel() {
        assertEquals("Cancel", dashboardPlansExporter.getCancelChangePlanCancelLabel());
    }

    @Test
    void testGetShowPlansWithProgress() {
        assertEquals(true, dashboardPlansExporter.getShowPlansWithProgress());
    }

    @Test
    void testGetDataValue() {
        assertEquals("Data", dashboardPlansExporter.getDataValue());
    }

    @Test
    void testGetMinutesValue() {
        assertEquals("MIN", dashboardPlansExporter.getMinutesValue());
    }

    @Test
    void testGetSmsValue() {
        assertEquals("SMS", dashboardPlansExporter.getSmsValue());
    }

    @Test
    void testGetLeftOfLabel() {
        assertEquals("{1} left of {0}", dashboardPlansExporter.getLeftOfLabel());
    }

    @Test
    void testGetValidLabel() {
        assertEquals("Valid until", dashboardPlansExporter.getValidLabel());
    }

    @Test
    void testGetDataTabName() {
        assertEquals("Data", dashboardPlansExporter.getDataTabName());
    }

    @Test
    void testGetMinTabName() {
        assertEquals("Min", dashboardPlansExporter.getMinTabName());
    }

    @Test
    void testGetSmsTabName() {
        assertEquals("SMS", dashboardPlansExporter.getSmsTabName());
    }

    @Test
    void testGetInternationalMinTabName() {
        assertEquals("International min", dashboardPlansExporter.getInternationalMinTabName());
    }

    @Test
    void testGetTitle() {
        assertEquals("My bundles", dashboardPlansExporter.getTitle());
    }
    
    @Test
    void testConsumedLabel() {
        assertEquals("Consumed", dashboardPlansExporter.getUsedLabel());
    }

}
