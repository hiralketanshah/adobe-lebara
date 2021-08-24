package com.lebara.core.models;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { UspExporter.class,
        ComponentExporter.class }, resourceType = UspExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class UspExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/usp";

    @ValueMapValue
    private String backgroundimage;

    @ValueMapValue

    private String alt;

    @ValueMapValue
    private String title;

    @ScriptVariable
    private Resource resource;

    @ChildResource
    private List<ImageProperties> uspdescription;

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public String getTitle() {
        return title;
    }

    public String getBackgroundimage() {
        return backgroundimage;
    }

    public String getAlt() {
        return alt;
    }

    public List<ImageProperties> getUsadescription() {
        return uspdescription;
    }


}
