package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {GetAppExporter.class, ComponentExporter.class},
        resourceType = GetAppExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GetAppExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/getapp";

    @ChildResource
    private List<Link> links;

    @ValueMapValue
    private String appTitle;

    @ValueMapValue
    private String backgroundImageDesktop;

    @ValueMapValue
    private String backgroundImageMobile;

    @ValueMapValue
    private String textDescription;
    @ValueMapValue
    private boolean show;

    public String getTextDescription() {
        return textDescription;
    }

    public boolean isShow() {
        return show;
    }

    public String getBackgroundImageDesktop() {
        return backgroundImageDesktop;
    }

    public String getBackgroundImageMobile() {
        return backgroundImageMobile;
    }

    public List<Link> getLinks() {
        return links;
    }

    public String getAppTitle() {
        return appTitle;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
