package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.lebara.core.dto.PageLinks;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FooterUpperLinksExporter.class, ComponentExporter.class},
        resourceType = FooterUpperLinksExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FooterUpperLinksExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/footer/footerupperlinks";

    @ScriptVariable
    private Resource resource;

    @ScriptVariable
    private PageManager pageManager;

    @ChildResource
    private List<Links> footerUpperLinks;

    public List<PageLinks> getLinks() {
        List<PageLinks> pageLinkList = new ArrayList<>();
        if (CollectionUtils.isEmpty(footerUpperLinks) || pageManager == null) {
            return pageLinkList;
        }
        for (Links parentLink : footerUpperLinks) {
            Page linkPage = pageManager.getContainingPage(parentLink.getExtensionlessLink());
            List<String> childPagesList = new ArrayList<>();
            PageLinks pageLinks = new PageLinks();
            if (linkPage == null) {
                continue;
            }
            if (StringUtils.isBlank(parentLink.getLabel())) {
                parentLink.setLabel(linkPage.getTitle());
            }
            pageLinks.setParentLinks(parentLink);
            Iterator<Page> childPath = linkPage.listChildren(new PageFilter());
            while (childPath.hasNext()) {
                childPagesList.add(AemUtils.getLinkWithExtension(childPath.next().getPath()));
            }
            pageLinks.setChildLinks(childPagesList);
            pageLinkList.add(pageLinks);

        }
        return pageLinkList;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
