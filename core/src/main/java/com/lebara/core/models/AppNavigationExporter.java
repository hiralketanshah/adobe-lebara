package com.lebara.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.AppNavigation;

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
    private String closeButtonLabel;
    
    @ChildResource
    private List<AppNavigation> navigationLinks;

    public String getCloseButtonLabel() {
        return closeButtonLabel;
    }

    public List<AppNavigation> getNavigationLinks() {
        return navigationLinks == null ? Collections.emptyList() : Collections.unmodifiableList(navigationLinks);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
