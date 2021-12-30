package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.adobe.cq.wcm.core.components.models.Breadcrumb;
import com.lebara.core.models.beans.ListItem;
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
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.ArrayList;
import java.util.List;

@Model(
    adaptables = SlingHttpServletRequest.class,
    adapters = {Breadcrumb.class, ComponentExporter.class},
    resourceType = BreadCrumbNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BreadCrumbNavigationImpl implements Breadcrumb {

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;


    @Self
    @Via(type = ResourceSuperType.class)
    private Breadcrumb delegate;

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/breadcrumb";


    @JsonProperty("items")
    public List<ListItem> getItemsNew() {
        List<ListItem> breadCrumbList = new ArrayList<>();
        for (NavigationItem items : delegate.getItems()) {
            ListItem listItem = new ListItem();
            String url = items.getURL();
            listItem.setTitle(items.getTitle());
            listItem.setUrl(AemUtils.getLinkWithExtension(url, request));
            if (StringUtils.isBlank(url)) {
                continue;
            }
            Resource pageRes = resourceResolver.getResource(url.replaceAll(".html", ""));
            if (pageRes == null) {
                continue;
            }
            Page page = pageRes.adaptTo(Page.class);
            if (page == null) {
                continue;
            }
            String breadCrumbTitle = AemUtils.getStringProperty(page.getContentResource(), "breadcrumbTitle");
            if (StringUtils.isNotBlank(breadCrumbTitle)) {
                listItem.setTitle(breadCrumbTitle);
            }
            breadCrumbList.add(listItem);
        }
        return breadCrumbList;
    }


    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }


}
