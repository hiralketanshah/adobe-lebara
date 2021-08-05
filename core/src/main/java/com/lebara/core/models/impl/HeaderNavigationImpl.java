package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.lebara.core.models.HeaderNavigation;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {HeaderNavigation.class, ComponentExporter.class},
        resourceType = HeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderNavigationImpl implements HeaderNavigation {

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String ctaText;

    @ValueMapValue
    private String ctaLink;

    @ValueMapValue
    private String accountLink;

    @Self
    @Via(type = ResourceSuperType.class)
    private Navigation delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/headernavigation";

    @Override
    public List<NavigationItem> getItems() {
        return delegate.getItems();
    }

    @Override
    public String getAccessibilityLabel() {
        return delegate.getAccessibilityLabel();
    }

    @Override
    public String getId() {
        return delegate.getId();
    }

    @Override
    public ComponentData getData() {
        return delegate.getData();
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    @Override
    public String getLogoPath() {
        return fileReference;
    }

    public String getCtaText() {
        return ctaText;
    }

    public String getCtaLink() {
        return ctaLink;
    }

    public String getAccountLink() {
        return accountLink;
    }
}
