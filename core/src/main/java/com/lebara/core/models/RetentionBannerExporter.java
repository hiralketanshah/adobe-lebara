package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { RetentionBannerExporter.class,
        ComponentExporter.class }, resourceType = RetentionBannerExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RetentionBannerExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/nl/retentionbanner";

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    protected Resource resource;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String ctaLink;

    @ValueMapValue
    private String ctaLabel;

    @ValueMapValue
    private String freeGBText;

    @ValueMapValue
    private String userType;

    private String appliedStyles;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCtaLabel() {
        return ctaLabel;
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink);
    }

    public String getFreeGBText() {
        return AemUtils.updateShortenLinksInRichText(freeGBText, request);
    }

    public String getUserType() {
        return userType;
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}