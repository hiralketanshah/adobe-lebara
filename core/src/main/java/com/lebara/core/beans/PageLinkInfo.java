package com.lebara.core.beans;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.dto.PageLink;
import com.lebara.core.models.Link;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adapters = {PageLinkInfo.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageLinkInfo {

    @ValueMapValue
    protected String link;

    @SlingObject
    private ResourceResolver resourceResolver;

    private PageLink pageLinks = new PageLink();

    @PostConstruct
    private void init() {
        if (link == null) {
            return;
        }
        Page linkPage = resourceResolver.getResource(link).adaptTo(Page.class);
        PageInfo parentLink = new PageInfo();
        if (linkPage != null) {
            parentLink.setLabel(AemUtils.getTitle(linkPage));
            parentLink.setLink(link);
            parentLink.setDescription(linkPage.getDescription());
            pageLinks.setParentLinks(parentLink);
            Iterator<Page> childPath = linkPage.listChildren(new PageFilter());
            List<Link> childPagesList = new ArrayList<>();
            while (childPath.hasNext()) {
                Link links = new Link();
                Page childPage = childPath.next();
                links.setLink(AemUtils.getLinkWithExtension(childPage.getPath()));
                links.setLabel(AemUtils.getTitle(childPage));
                childPagesList.add(links);
            }
            pageLinks.setChildLinks(childPagesList);
        }
    }

    public PageLink getPageLinks() {
        return pageLinks;
    }
}
