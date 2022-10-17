package com.lebara.core.models;

import java.util.Optional;

import javax.inject.Named;

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

@Model(adaptables = SlingHttpServletRequest.class, adapters = { InformativeBannerExporter.class,
        ComponentExporter.class }, resourceType = InformativeBannerExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class InformativeBannerExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/informativebanner";

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    Resource resource;

    @ValueMapValue
    @Named("fileReference")
    private String image;

    @ValueMapValue
    private String alt;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String subTitle;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String ctaLink;

    @ValueMapValue
    private String ctaLabel;
    
    @ValueMapValue
    private String ctaColor;

    @ValueMapValue
    private String textColor;

    @ValueMapValue
    private String backgroundColor;
    
    private String appliedStyles;

    public String getImage() {
        return image;
    }

    public String getAlt() {
        return alt;
    }

    public String getLinkURL() {
        return AemUtils.getLinkWithExtension(ctaLink);
    }

    public String getTitle() {
        return title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public String getDescription() {
        return AemUtils.updateShortenLinksInRichText(description, request);
    }

    public String getCtaLink() {
        return AemUtils.getLinkWithExtension(ctaLink);
    }

    public String getCtaLabel() {
        return ctaLabel;
    }

    public String getCtaColor() {
        return ctaColor;
    }

    public String getTextColor() {
        return textColor;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}