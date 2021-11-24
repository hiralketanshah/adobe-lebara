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

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { HowItWorksExporter.class,
        ComponentExporter.class }, resourceType = HowItWorksExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HowItWorksExporter extends UspExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/howitworks";

  /*  @ScriptVariable
    private Resource resource;

    @ChildResource
    private List<ImageProperties> uspList;

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public List<ImageProperties> getUspList() {
        return (uspList == null) ? Collections.emptyList() : uspList;
    }*/

    @ValueMapValue
    private String titleDescription;

    public String getTitleDescription() {
        return titleDescription;
    }

}
