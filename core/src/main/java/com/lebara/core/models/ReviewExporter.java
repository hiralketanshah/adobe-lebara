package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ReviewExporter.class, ComponentExporter.class},
        resourceType = ReviewExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ReviewExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/review";

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
