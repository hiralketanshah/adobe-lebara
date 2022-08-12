package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import com.lebara.core.models.dashboard.ManagePostpaidPlansExporter;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class ManagePostpaidPlansExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/dashboard-postpaid/jcr:content/root/responsivegrid/managepostpaidplans";


    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/dashboard-postpaid.json", "/content/lebara/de/de/dashboard-postpaid");
    }

    @Test
    void getDashboardItems() {
        aemContext.currentResource(PROPERTIES_JSON);
        ManagePostpaidPlansExporter dashboardPlansExporter = aemContext.request().adaptTo(ManagePostpaidPlansExporter.class);
        dashboardPlansExporter.getPlanLabels();
        dashboardPlansExporter.getRenewalLabel();
        dashboardPlansExporter.getPlanChangeMessage();
        dashboardPlansExporter.getCancelLabel();
        dashboardPlansExporter.getManageLabel();
        dashboardPlansExporter.getManageLink();
        dashboardPlansExporter.getAutoRenewLabel();
        dashboardPlansExporter.getAutoRenewDesc();
        dashboardPlansExporter.getButtonText();
        dashboardPlansExporter.getHidePrice();
        dashboardPlansExporter.getShowTabData();
        dashboardPlansExporter.getHideAutoRenew();
        dashboardPlansExporter.getShowManageButton();
        dashboardPlansExporter.getRequestPlanRemoved();
        dashboardPlansExporter.getPlanChangeTitle();
        dashboardPlansExporter.getPlanChangeDesc();
        dashboardPlansExporter.getTermsConsentLabel();
        dashboardPlansExporter.getTermsConditionsLabel();
        dashboardPlansExporter.getTermsConditionsLink();
        dashboardPlansExporter.getContractConsentLabel();
        dashboardPlansExporter.getConfirmLabel();
        dashboardPlansExporter.getAllActivePlansLabel();
        dashboardPlansExporter.getPlanLabels();
    }


}
