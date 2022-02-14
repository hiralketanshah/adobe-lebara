package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {AddPayPalExporter.class,
        ComponentExporter.class}, resourceType = AddPayPalExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AddPayPalExporter extends IntroExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/user/addpaypal";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String labelTermsandConditions;

    @ValueMapValue
    private String ctaButtonLabel;

    @ValueMapValue
    private String ctaCancelLabel;

    @ValueMapValue
    private String ctaClose;

    @ValueMapValue
    private String modalHeadingTerms;

    @ValueMapValue
    private String modalHeadingPPPayment;

    @ValueMapValue
    private String termsFullDescription;

    public String getLabelTermsandConditions() {
        return labelTermsandConditions;
    }

    public String getCtaButtonLabel() {
        return ctaButtonLabel;
    }

    public String getCtaCancelLabel() {
        return ctaCancelLabel;
    }

    public String getCtaClose() {
        return ctaClose;
    }

    public String getModalHeadingTerms() {
        return modalHeadingTerms;
    }

    public String getModalHeadingPPPayment() {
        return modalHeadingPPPayment;
    }

    public String getTermsFullDescription() {
        return AemUtils.updateShortenLinksInRichText(termsFullDescription,slingRequest);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
