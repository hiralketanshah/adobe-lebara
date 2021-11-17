package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DashboardAddOnsExporter.class, ComponentExporter.class},
        resourceType = DashboardAddOnsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DashboardAddOnsExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/addons";

    @ValueMapValue
    private String addMoreLabel;

    @ValueMapValue
    private String leftOfText;

    @ValueMapValue
    private String validToLabel;

    public String getAddMoreLabel() {
        return addMoreLabel;
    }

    public String getLeftOfText() {
        return leftOfText;
    }

    public String getValidToLabel() {
        return validToLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
