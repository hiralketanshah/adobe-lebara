package com.lebara.core.models.dashboard;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {NextBillExporter.class, ComponentExporter.class},
        resourceType = NextBillExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class NextBillExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/nextbill";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    public String title;
    @ValueMapValue
    public String durationLabel;
    @ValueMapValue
    public String totalEstimatedLabel;
    @ValueMapValue
    public String monthlyChargesLabel;
    @ValueMapValue
    public String additionalChargesLabel;
    @ValueMapValue
    public String buttonLabel;
    @ValueMapValue
    public String buttonLink;
    @ValueMapValue
    public Boolean hideButton;

    public String getButtonLink(){
        return AemUtils.getLinkWithExtension(buttonLink, resourceResolver);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
