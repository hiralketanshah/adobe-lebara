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
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {AppNavigationExporter.class, ComponentExporter.class},
        resourceType = AppNavigationExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AppNavigationExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/app/appnavigation";

    @ScriptVariable
    private Resource resource;
    @ValueMapValue
    private String title;
    @ChildResource
    private List<Link> navigationLinks;

    public String getTitle() {
        return title;
    }

    public List<Link> getNavigationLinks() {
        return navigationLinks == null ? Collections.emptyList() : Collections.unmodifiableList(navigationLinks);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
