package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import javax.annotation.PostConstruct;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DynamicCartExporter.class, ComponentExporter.class},
        resourceType = DynamicCartExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DynamicCartExporter extends HeadingExporter {
    private I18n i18n;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;
    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dynamiccart";

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    @JsonProperty("selectedPlanLabel")
    public String getTitle() {
        return (i18n == null ? "Selected Plan" : i18n.get("lebara.selectedplan.label"));
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
