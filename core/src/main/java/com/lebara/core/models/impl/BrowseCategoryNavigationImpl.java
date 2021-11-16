package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.BrowseCategoryNavigation;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {BrowseCategoryNavigation.class, ComponentExporter.class},
        resourceType = BrowseCategoryNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BrowseCategoryNavigationImpl implements BrowseCategoryNavigation {

    @ValueMapValue
    private String browseCategoriesLabel;


    @Self
    @Via(type = ResourceSuperType.class)
    private Navigation delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/helpcenter/browsecategories";

    @Override
    public List<NavigationItem> getItems() {
        return delegate.getItems();
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }



    @Override
    public String getBrowseCategoryLabel() {
        return browseCategoriesLabel;
    }
}
