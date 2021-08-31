package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lebara.core.models.LebaraContainer;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.List;
import java.util.Map;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = {LebaraContainer.class, ComponentExporter.class},
        resourceType = LebaraContainerImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME , extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LebaraContainerImpl implements LebaraContainer {

    @ScriptVariable
    protected Resource resource;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/container";

    @Self
    @Via(value = "core/wcm/components/container/v1/container", type = ResourceSuperType.class)
    private LayoutContainer delegate;

    @Override
    public LayoutType getLayout() {
        return delegate.getLayout();
    }

    @Override
    @JsonIgnore
    public List<ListItem> getItems() {
        return delegate.getItems();
    }

    @Override
    public String getBackgroundStyle() {
        return delegate.getBackgroundStyle();
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    @Override
    public Map<String, ? extends ComponentExporter> getExportedItems() {
        return delegate.getExportedItems();
    }

    @Override
    public String[] getExportedItemsOrder() {
        return delegate.getExportedItemsOrder();
    }

    @Override
    public String getId() {
        return delegate.getId();
    }
}
