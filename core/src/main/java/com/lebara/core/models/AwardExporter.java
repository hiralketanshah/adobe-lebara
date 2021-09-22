package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {AwardExporter.class, ComponentExporter.class},
        resourceType = AwardExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AwardExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/awards";

    @ScriptVariable
    private Resource resource;

    @ChildResource
    private List<Link> links;

    @ValueMapValue
    private String awardTitle;

    public List<Link> getLinks() {
        return links;
    }

    public String getAwardTitle() {
        return awardTitle;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
