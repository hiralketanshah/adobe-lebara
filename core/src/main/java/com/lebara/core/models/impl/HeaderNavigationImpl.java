package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.CustomNavigationItem;
import com.lebara.core.models.HeaderNavigation;
import com.lebara.core.utils.AemUtils;
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
import java.util.stream.Collectors;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {HeaderNavigation.class, ComponentExporter.class},
        resourceType = HeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderNavigationImpl implements HeaderNavigation {

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String topupCtaText;

    @ValueMapValue
    private String topupCtaLink;

    @ValueMapValue
    private String accountLink;

    @ValueMapValue
    private String newText;

    @ValueMapValue
    private String viewAllButtonText;

    @ValueMapValue
    private String viewAllButtonLink;

    @Self
    @Via(type = ResourceSuperType.class)
    private Navigation delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/headernavigation";

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

    @Override
    public String getTopupCtaText() {
        return topupCtaText;
    }

    @Override
    public String getTopupCtaLink() {
        return AemUtils.getLinkWithExtension(topupCtaLink);
    }

    public String getAccountLink() {
        return AemUtils.getLinkWithExtension(accountLink);
    }

    @Override
    public String getNewText(){
        return newText;
    }

    @Override
    public String getViewAllButtonText() {
        return viewAllButtonText;
    }

    @Override
    public String getViewAllButtonLink() {
        return viewAllButtonLink;
    }

    /** Navigation Items from resourceSuperType
     *  with additional custom properties
     * @return List of custom navigation items
     */
    @JsonProperty("items")
    public List<CustomNavigationItem> getCustomItems() {
        return delegate.getItems().stream()
                .map(navItem -> new CustomNavigationItem(resource, navItem))
                .collect(Collectors.toList());
    }
}
