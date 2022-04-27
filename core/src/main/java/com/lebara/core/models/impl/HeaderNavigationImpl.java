package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.HeaderPageBean;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
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

@Model(adaptables = SlingHttpServletRequest.class, adapters = {HeaderNavigationImpl.class, ComponentExporter.class},
        resourceType = HeaderNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderNavigationImpl implements ComponentExporter {

    @SlingObject
    private SlingHttpServletRequest request;

    @ScriptVariable
    private PageManager pageManager;

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

    @ValueMapValue
    private String header1Link;

    @ValueMapValue
    private String header1Label;

    @ValueMapValue
    private String header2Link;

    @ValueMapValue
    private String header2Label;

    @ValueMapValue
    private String header3Link;

    @ValueMapValue
    private String header3Label;

    @ValueMapValue
    private String header4Link;

    @ValueMapValue
    private String header4Label;

    @ValueMapValue
    private String header5Link;

    @ValueMapValue
    private String header5Label;

    @ValueMapValue
    private String header6Link;

    @ValueMapValue
    private String header6Label;

    @ChildResource
    private List<Link> links;

    @ValueMapValue
    private String logoutLabel;

    @ChildResource
    private SearchModelImpl search;

    @ChildResource
    private List<Resource> header1;

    @ChildResource
    private List<Resource> header2;

    @ChildResource
    private List<Resource> header3;

    @ChildResource
    private List<Resource> header4;

    @ChildResource
    private List<Resource> header5;

    @ChildResource
    private List<Resource> header6;

    private ResourceResolver resourceResolver;
    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/header/headernavigation";

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
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

    public String getNewText() {
        return newText;
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

    @JsonProperty("items")
    public List<HeaderPageBean> getParentList() {
        List<HeaderPageBean> headerPageBeanList = new ArrayList<>();
        populateParentList(headerPageBeanList, header1Link, header1Label, header1);
        populateParentList(headerPageBeanList, header2Link, header2Label, header2);
        populateParentList(headerPageBeanList, header3Link, header3Label, header3);
        populateParentList(headerPageBeanList, header4Link, header4Label, header4);
        populateParentList(headerPageBeanList, header5Link, header5Label, header5);
        populateParentList(headerPageBeanList, header6Link, header6Label, header6);
        return headerPageBeanList;
    }

    public HeaderPageBean getLevel0List(String link, String label, List<Resource> header) {
        ValueMap properties = getValueMapFromPageLink(link);
        return new HeaderPageBean(properties, AemUtils.getLinkWithExtension(link, request), getTitle(label, link), 0, getLevel1List(header));
    }

    private List<HeaderPageBean> getLevel1List(List<Resource> header) {
        List<HeaderPageBean> outerList = new ArrayList<>();
        if (header != null) {
            for (Resource level1Res : header) {
                String headerlabel = AemUtils.getStringProperty(level1Res, "label");
                String headerlink = AemUtils.getStringProperty(level1Res, "link");
                ValueMap properties = getValueMapFromPageLink(headerlink);
                HeaderPageBean headerPageBean = new HeaderPageBean(properties, AemUtils.getLinkWithExtension(headerlink, request), getTitle(headerlabel, headerlink), 1, getLevel2List(level1Res));
                outerList.add(headerPageBean);
            }
        }
        return outerList;
    }

    private List<HeaderPageBean> getLevel2List(Resource level1Res) {
        Resource child = level1Res.getChild("header");
        List<HeaderPageBean> innerList = new ArrayList<>();
        if (child != null) {
            for (Resource headerChild : child.getChildren()) {
                String headerlabell2 = AemUtils.getStringProperty(headerChild, "label");
                String headerlinkl2 = AemUtils.getStringProperty(headerChild, "link");
                ValueMap properties = getValueMapFromPageLink(headerlinkl2);
                HeaderPageBean headerPageBean = new HeaderPageBean(properties, AemUtils.getLinkWithExtension(headerlinkl2, request), getTitle(headerlabell2, headerlinkl2), 2, new ArrayList<>());
                innerList.add(headerPageBean);
            }
        }
        return innerList;
    }

    private void populateParentList(List<HeaderPageBean> headerPageBeanList, String link, String label, List<Resource> header) {
        if (StringUtils.isNotBlank(link)) {
            headerPageBeanList.add(getLevel0List(link, label, header));
        }
    }

    private String getTitle(String overriddenTitle, String pagePath) {
        if (StringUtils.isBlank(overriddenTitle)) {
            return AemUtils.getTitle(pageManager.getContainingPage(pagePath));
        }
        return overriddenTitle;
    }

    private ValueMap getValueMapFromPageLink(String link) {
        Page page = pageManager.getContainingPage(link);
        ValueMap properties = null;
        if (page != null) {
            properties = page.getContentResource().getValueMap();
        }
        return properties;
    }
}
