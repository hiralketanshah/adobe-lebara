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

@Model(adaptables = SlingHttpServletRequest.class, adapters = { InformativeCardExporter.class,
        ComponentExporter.class }, resourceType = InformativeCardExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class InformativeCardExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/informativecard";

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    Resource resource;

    @ValueMapValue
    @Named("imageAlign")
    private String align;

    @ValueMapValue
    @Named("fileReference")
    private String src;

    @ValueMapValue
    private String linkURL;

    @ValueMapValue
    private String width;

    @ValueMapValue
    private String boxBgColor;

    @ValueMapValue
    @Named("title")
    private String heading;

    @ValueMapValue
    @Named("subTitle")
    private String helplineNumber;

    @ValueMapValue
    @Named("description")
    private String moreInfo;

    private String appliedStyles;

    public String getSrc() {
        return src;
    }

    public String getLinkURL() {
        return AemUtils.getLinkWithExtension(linkURL, request);
    }

    public String getAlign() {
        return align;
    }

    public String getWidth() {
        return width;
    }

    public String getBoxBgColor() {
        return boxBgColor;
    }

    public String getHeading() {
        return heading;
    }

    public String getHelplineNumber() {
        return helplineNumber;
    }

    public String getMoreInfo() {
        return AemUtils.updateShortenLinksInRichText(moreInfo, request);
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class)).map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}