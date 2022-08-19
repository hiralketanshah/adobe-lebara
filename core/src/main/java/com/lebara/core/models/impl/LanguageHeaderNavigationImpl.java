package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LanguageNavigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.LanguageHeaderNavigation;
import com.lebara.core.models.beans.LanguageNavListItem;
import com.lebara.core.utils.AemUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { LanguageHeaderNavigation.class,
        ComponentExporter.class }, resourceType = LanguageHeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LanguageHeaderNavigationImpl implements LanguageHeaderNavigation {

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String storeLink;

    @ValueMapValue
    private String helpLink;

    @ValueMapValue
    private String storeTitle;

    @ValueMapValue
    private String helpTitle;

    @Self
    @Via(type = ResourceSuperType.class)
    private LanguageNavigation delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/languagenavigation";

    @JsonProperty("items")
    public List<LanguageNavListItem> getLangNavItems() {
        List<LanguageNavListItem> langNavList = new ArrayList<>();
        for (NavigationItem items : delegate.getItems()) {
            LanguageNavListItem languageNavListItem = new LanguageNavListItem();
            languageNavListItem.setActive(items.isActive());
            languageNavListItem.setTitle(items.getTitle());
            languageNavListItem.setUrl(AemUtils.getLinkWithExtension(items.getURL(), request));
            languageNavListItem.setLanguageIcon(getLanguageIcon(items.getPath()));
            langNavList.add(languageNavListItem);
        }
        return langNavList;
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
        return AemUtils.getLinkWithExtension(storeLink, request);
    }

    @Override
    public String getHelpLink() {
        return AemUtils.getLinkWithExtension(helpLink, request);
    }

    @Override
    public String getStoreTitle() {
        return storeTitle;
    }

    @Override
    public String getHelpTitle() {
        return helpTitle;
    }

    private String getLanguageIcon(String pagePath) {
        if (resourceResolver == null) {
            return StringUtils.EMPTY;
        }
        Resource pageRes = resourceResolver.getResource(pagePath);
        if (pageRes == null) {
            return StringUtils.EMPTY;
        }
        Page page = pageRes.adaptTo(Page.class);
        if (page == null) {
            return StringUtils.EMPTY;
        }

        InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
        return AemUtils.getInheritedValue("languageIcon", inheritedProp);
    }
}
