package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PaymentSummaryExporter.class,
        ComponentExporter.class }, resourceType = PaymentSummaryExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PaymentSummaryExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "/apps/lebara/components/paymentsummary";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String conditionsContent;

    @ValueMapValue
    private String termsAndConditionsContent;

    @ValueMapValue
    private String paymentMethodLabel;

    @ValueMapValue
    private String buttonLabel;

    @ValueMapValue
    private String contractSummaryLabel;

    @ValueMapValue
    private String contractSummaryPdfRootPath;

    @ValueMapValue
    private String pdfDownloadLabel;

    @ValueMapValue
    private String pdfCloseLabel;


    public String getConditionsContent() {
        return AemUtils.updateShortenLinksInRichText(conditionsContent, resourceResolver);
    }

    public String getTermsAndConditionsContent() {
        return AemUtils.updateShortenLinksInRichText(termsAndConditionsContent, resourceResolver);
    }

    public String getPaymentMethodLabel() {
        return paymentMethodLabel;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getContractSummaryLabel() {
        return contractSummaryLabel;
    }

    public String getContractSummaryPdfRootPath() {
        return contractSummaryPdfRootPath;
    }

    public String getPdfDownloadLabel() {
        return pdfDownloadLabel;
    }

    public String getPdfCloseLabel() {
        return pdfCloseLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
