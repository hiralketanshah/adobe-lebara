package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.lebara.core.dto.PageLink;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FooterExporter.class, ComponentExporter.class},
        resourceType = FooterExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FooterExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/footer";

    @SlingObject
	private SlingHttpServletRequest request;

    @ScriptVariable
    private PageManager pageManager;

    @ChildResource
    private List<Link> footerUpperLinks;

    @ChildResource
    @Named("footercopyright/links")
    private List<Link> copyrightLinks;

    @ChildResource
    @Named("footercopyright/copyrightText")
    private String copyrightText;

    @ChildResource
    private GetAppExporter getapp;

    @ChildResource
    private FollowUsExporter followus;

    public List<Link> getCopyrightLinks() {
        return copyrightLinks;
    }

    public String getCopyrightText() {
        return copyrightText;
    }

    private List<PageLink> pageLinkList = new ArrayList<>();

    @PostConstruct
    public void init() {
        if (CollectionUtils.isEmpty(footerUpperLinks) || pageManager == null) {
            return;
        }
        for (Link parentLink : footerUpperLinks) {
            Page linkPage = pageManager.getContainingPage(parentLink.getExtensionlessLink());
            List<Link> childPagesList = new ArrayList<>();
            PageLink pageLinks = new PageLink();
            if (linkPage == null) {
                continue;
            }
            if (StringUtils.isBlank(parentLink.getLabel())) {
                parentLink.setLabel(AemUtils.getTitle(linkPage));
            }
            pageLinks.setParentLinks(parentLink);
            Iterator<Page> childPath = linkPage.listChildren(new PageFilter());
            while (childPath.hasNext()) {
                Link links = new Link();
                Page childPage = childPath.next();
                links.setLink(AemUtils.getLinkWithExtension(childPage.getPath(), request));
                links.setLabel(AemUtils.getTitle(childPage));
                childPagesList.add(links);
            }
            pageLinks.setChildLinks(childPagesList);
            pageLinkList.add(pageLinks);

        }
    }

    public List<PageLink> getFooterUpperLinks() {
        return pageLinkList;
    }

    public FollowUsExporter getFollowus() {
        return followus;
    }

    public GetAppExporter getGetapp() {
        return getapp;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
