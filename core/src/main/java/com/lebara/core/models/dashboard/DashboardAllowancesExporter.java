package com.lebara.core.models.dashboard;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DashboardAllowancesExporter.class, ComponentExporter.class},
        resourceType = DashboardAllowancesExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DashboardAllowancesExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/dashboardallowances";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String dataLabel;

    @ValueMapValue
    private String dataValue;

    @ValueMapValue
    private String minutesLabel;

    @ValueMapValue
    private String minutesValue;

    @ValueMapValue
    private String smsLabel;

    @ValueMapValue
    private String smsValue;

    @ValueMapValue
    private String validUntilLabel;

    @ValueMapValue
    private String aioLabel;

    @ValueMapValue
    private String l2lLabel;

    @ValueMapValue
    private String localLabel;

    @ValueMapValue
    private String leftOfLabel;

    @ValueMapValue
    private boolean showPlansWithProgress;

    public String getTitle() {
        return title;
    }

    public String getDataLabel() {
        return dataLabel;
    }

    public String getDataValue() {
        return dataValue;
    }

    public String getMinutesLabel() {
        return minutesLabel;
    }

    public String getMinutesValue() {
        return minutesValue;
    }

    public String getSmsLabel() {
        return smsLabel;
    }

    public String getSmsValue() {
        return smsValue;
    }

    public String getValidUntilLabel() {
        return validUntilLabel;
    }

    public String getAioLabel() {
        return aioLabel;
    }

    public String getL2lLabel() {
        return l2lLabel;
    }

    public String getLocalLabel() {
        return localLabel;
    }

    public String getLeftOfLabel() {
        return leftOfLabel;
    }

    public boolean getShowPlansWithProgress() {
        return showPlansWithProgress;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
