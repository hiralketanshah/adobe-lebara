package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LanguageNavigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.lebara.core.models.LanguageHeaderNavigation;
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


@Model(adaptables = SlingHttpServletRequest.class, adapters = {LanguageHeaderNavigation.class, ComponentExporter.class},
        resourceType = LanguageHeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LanguageHeaderNavigationImpl implements LanguageHeaderNavigation {

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String storeLink;

    @ValueMapValue
    private String helpLink;

    @Self
    @Via(type = ResourceSuperType.class)
    private LanguageNavigation delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/languagenavigation";

    @Override
    public List<NavigationItem> getItems() {
        return delegate.getItems();
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
    public String getStoreLink() {
        return storeLink;
    }

    @Override
    public String getHelpLink() {
        return helpLink;
    }
}
