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

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {RecentPostsExporter.class, ComponentExporter.class},
        resourceType = RecentPostsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RecentPostsExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/recentposts";

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String link;

    @ChildResource
    private List<RecentPostImpl> recentpost;

    public List<RecentPostImpl> getRecentpost() {
        return recentpost;
    }

    public String getTitle() {
        return title;
    }

    public String getLabel() {
        return label;
    }

    public String getLink() {
        return link;
    }


    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
