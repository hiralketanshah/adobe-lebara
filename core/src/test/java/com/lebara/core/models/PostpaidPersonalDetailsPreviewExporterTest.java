package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PostpaidPersonalDetailsPreviewExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/postpaid-personal-details-preview/jcr:content/root/responsivegrid/postpaidpersonaldeta";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(PostpaidPersonalDetailsPreviewExporter.class);
        aemContext.load().json("/postpaid-personal-details-preview.json", "/content/lebara/de/de/postpaid-personal-details-preview");
    }

    @Test
    void getfNameLabel() {
        aemContext.currentResource(PROPERTIES_JSON);
        PostpaidPersonalDetailsPreviewExporter postpaidPersonalDetailsPreviewExporter = aemContext.request().adaptTo(PostpaidPersonalDetailsPreviewExporter.class);
        postpaidPersonalDetailsPreviewExporter.getfNameLabel();
        postpaidPersonalDetailsPreviewExporter.getEmailLabel();
        postpaidPersonalDetailsPreviewExporter.getDobLabel();
        postpaidPersonalDetailsPreviewExporter.getAddress();
        postpaidPersonalDetailsPreviewExporter.getPortingSectionHeading();
        postpaidPersonalDetailsPreviewExporter.getCustomerSupportText();
        postpaidPersonalDetailsPreviewExporter.getCtaContinueLabel();
        postpaidPersonalDetailsPreviewExporter.getOrderTotalLabel();
        postpaidPersonalDetailsPreviewExporter.getPaymentMethodLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrdersimPlanLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrderMinutesLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrderTwentyFourMonthsLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrderOneMonthLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrderContractdurationLabel();
        postpaidPersonalDetailsPreviewExporter.getYourOrderDataLabel();
        postpaidPersonalDetailsPreviewExporter.getProductAndServicePreviewText();
    }
}