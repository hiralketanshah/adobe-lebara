package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.beans.PageLinkInfo;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {BrowseCategoriesExporter.class, ComponentExporter.class},
        resourceType = BrowseCategoriesExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BrowseCategoriesExporter extends HeadingExporter {

    @ChildResource
    private List<PageLinkInfo> browseCategoriesLinks;
    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/helpcenter/browsecategories";

    public List<PageLinkInfo> getBrowseCategoriesLinks() {
        return browseCategoriesLinks;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
