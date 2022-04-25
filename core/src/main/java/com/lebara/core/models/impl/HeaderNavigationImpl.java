package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.CustomNavigationItem;
import com.lebara.core.models.HeaderNavigation;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.lebara.core.models.beans.Link;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {HeaderNavigation.class, ComponentExporter.class},
        resourceType = HeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderNavigationImpl implements ComponentExporter {

    @SlingObject
    private SlingHttpServletRequest request;

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String topupCtaText;

    @ValueMapValue
    private String logoLinkURL;

    @ValueMapValue
    private String topupCtaLink;

    @ValueMapValue
    private String accountLink;

    @ValueMapValue
    private String newText;

    @ValueMapValue
    private String viewAllButtonLink;

    @ChildResource
    private List<Link> links;

    @ValueMapValue
    private String logoutLabel;

    @ChildResource
    private SearchModelImpl search;


    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/headernavigation";

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public String getLogoPath() {
        return fileReference;
    }

    public String getTopupCtaText() {
        return topupCtaText;
    }

    public String getTopupCtaLink() {
        return AemUtils.getLinkWithExtension(topupCtaLink, request);
    }

    public String getLogoLinkURL() {
        return AemUtils.getLinkWithExtension(logoLinkURL, request);
    }

    public String getAccountLink() {
        return AemUtils.getLinkWithExtension(accountLink, request);
    }

    public String getNewText(){
        return newText;
    }

    /** Navigation Items from resourceSuperType
     *  with additional custom properties
     * @return List of custom navigation items
     */
    @JsonProperty("items")
    public List<CustomNavigationItem> getCustomItems() {
        return new ArrayList<>();
    }

    @JsonProperty("loggedInMenuItems")
    public List<Link> getLinks() {
        return links == null ? (Collections.emptyList()) : (Collections.unmodifiableList(links));
    }

    public String getLogoutLabel() {
        return logoutLabel;
    }

    public SearchModelImpl getSearch() {
        return search;
    }
}
