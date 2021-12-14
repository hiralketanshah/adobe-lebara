package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.Link;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.*;

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
    private String getAppLabel;

    @ValueMapValue
    private String backgroundImageDesktop;

    @ValueMapValue
    private String backgroundImageMobile;

    @ValueMapValue
    private String textDescription;

    @ValueMapValue
    private List<String> textCol1;

    @ValueMapValue
    private List<String> textCol2;
    
    @ValueMapValue
    private boolean show;

    @ValueMapValue
    private String backgroundColor;

    public String getTextDescription() { return textDescription; }

    public boolean isShow() { return show; }

    public String getBackgroundImageDesktop() { return backgroundImageDesktop; }

    public String getBackgroundImageMobile() { return backgroundImageMobile; }

    public List<Link> getLinks() { return links == null ? Collections.emptyList() : Collections.unmodifiableList(links);}

    public String getAppTitle() { return appTitle; }

    public String getGetAppLabel() { return getAppLabel; }

    public String getBackgroundColor() { return backgroundColor;}

    public List<String> getTextCol1() {
        if (textCol1 != null) {
            return Collections.unmodifiableList(textCol1);
        }
        return Collections.emptyList();
    }

    public List<String> getTextCol2() { return textCol2 == null ? Collections.emptyList() : Collections.unmodifiableList(textCol2);}

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
