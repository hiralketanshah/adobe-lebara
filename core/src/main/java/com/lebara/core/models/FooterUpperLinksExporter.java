package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.PageManager;
import org.apache.commons.collections.ListUtils;
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

    @ChildResource
    private List<Links> footerUpperLinks;

    public List<Links> getLinks() {
        if (CollectionUtils.isEmpty(footerUpperLinks)) {
            return ListUtils.EMPTY_LIST;
        }
        for (Links link : footerUpperLinks) {
            if (StringUtils.isBlank(link.getLabel())) {
                PageManager pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
                //link.setLabel(pageManager.getContainingPage(link.getExtensionlessLink()).getPageTitle());
                //todo: add correct logic
                link.setLabel("title of page");
            }
        }
        return footerUpperLinks;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
