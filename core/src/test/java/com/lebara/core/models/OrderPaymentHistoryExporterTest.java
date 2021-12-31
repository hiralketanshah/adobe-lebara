package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class OrderPaymentHistoryExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/lebara/de/de/order-payment-history/jcr:content/root/responsivegrid/orderpaymenthistory";

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SupportExporter.class);
        aemContext.load().json("/order-payment-history.json", "/content/lebara/de/de/order-payment-history");
    }


    @Test
    void getTitleTest() {
        aemContext.currentResource(PROPERTIES_JSON);
        OrderPaymentHistoryExporter orderPaymentHistoryExporter = aemContext.request().adaptTo(OrderPaymentHistoryExporter.class);
        orderPaymentHistoryExporter.getTitle();
        orderPaymentHistoryExporter.getExportedType();
        orderPaymentHistoryExporter.getFrmFields();
    }

}