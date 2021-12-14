package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PromoBannerSmallExporter.class, ComponentExporter.class},
        resourceType = PromoBannerSmallExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PromoBannerSmallExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/promobannersmall";

    @ValueMapValue
    @Named("heading")
    private String headingText;

    @ValueMapValue
    @Named("subHeading")
    private String subHeadingText;

    @ValueMapValue
    private String knowMoreButtonText;

    @ValueMapValue
    private String promoText;

    public String getHeadingText() {
        return headingText;
    }

    public String getSubHeadingText() {
        return subHeadingText;
    }

    public String getKnowMoreButtonText() {
        return knowMoreButtonText;
    }

    public String getPromoText() {
        return promoText;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
