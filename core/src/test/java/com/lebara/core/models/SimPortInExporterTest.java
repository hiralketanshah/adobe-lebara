package com.lebara.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class SimPortInExporterTest {

    private final AemContext aemContext = new AemContext();
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/embed3";

    @InjectMocks
    SimPortInExporter simPortInExporter = new SimPortInExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(SimPortInExporter.class);
        aemContext.load().json("/page.json", "/content");
    }

    @Test
    void getPretitle() {
        aemContext.currentResource(PROPERTIES_JSON);
        simPortInExporter = aemContext.request().adaptTo(SimPortInExporter.class);
        assertEquals("lebara/components/embed2", simPortInExporter.getExportedType());
        assertEquals("pretitle", simPortInExporter.getPretitle());
        assertEquals("title", simPortInExporter.getTitle());
        assertEquals("dobTitle", simPortInExporter.getDobTitle());
        assertEquals("dobDesc", simPortInExporter.getDobDesc());
        assertEquals("dayFieldLabel", simPortInExporter.getDayFieldLabel());
        assertEquals("monthFieldLabel", simPortInExporter.getMonthFieldLabel());
        assertEquals("yearFieldLabel", simPortInExporter.getYearFieldLabel());
        assertEquals("mobileNumberLabel", simPortInExporter.getMobileNumberLabel());
        assertEquals("mobileNumberDesc", simPortInExporter.getMobileNumberDesc());
        assertEquals("currentProviderLabel", simPortInExporter.getCurrentProviderLabel());
        assertEquals("currentProviderDesc", simPortInExporter.getCurrentProviderDesc());
        assertEquals("currentProviderDefaultSelectValue", simPortInExporter.getCurrentProviderDefaultSelectValue());
        assertEquals("contractInfo", simPortInExporter.getContractInfo());
        assertEquals("portingInfo", simPortInExporter.getPortingInfo());
        assertEquals("consentOne", simPortInExporter.getConsentOne());
        assertEquals("consentTwo", simPortInExporter.getConsentTwo());
        assertEquals("dataProtectionMessage", simPortInExporter.getDataProtectionMessage());
        assertEquals("termsAndConditions", simPortInExporter.getTermsAndConditions());
        assertEquals("continueButtonLabel", simPortInExporter.getContinueButtonLabel());
        assertEquals("cancelbuttonlabel", simPortInExporter.getCancelbuttonlabel());
        assertEquals("dayFieldErrorMessage", simPortInExporter.getDayFieldErrorMessage());
        assertEquals("monthFieldErrorMessage", simPortInExporter.getMonthFieldErrorMessage());
        assertEquals("yearFieldErrorMessage", simPortInExporter.getYearFieldErrorMessage());
        assertEquals("currentProviderErrorMessage", simPortInExporter.getCurrentProviderErrorMessage());
        assertEquals("mobileNumberErrorMessage", simPortInExporter.getMobileNumberErrorMessage());
        assertEquals("mobileNumberMaxLength", simPortInExporter.getMobileNumberMaxLength());
        assertEquals("mobileNumberFieldPattern", simPortInExporter.getMobileNumberFieldPattern());
        assertEquals("doitLaterButtonLabel", simPortInExporter.getDoitLaterButtonLabel());

    }
}