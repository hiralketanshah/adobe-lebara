package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DashboardPlansExporter.class, ComponentExporter.class},
        resourceType = DashboardPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DashboardPlansExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/dashboardplans";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String buttonLabel;
    @ValueMapValue
    private String autoRenewLabel;
    @ValueMapValue
    private String renewalLabel;
    @ValueMapValue
    private String autoRenewDesc;
    @ValueMapValue
    private String autoRenewTurnOnLabel;
    @ValueMapValue
    private String fetchDataCallback;
    @ValueMapValue
    private String buttonText;
    @ValueMapValue
    private String cancelLabel;
    @ValueMapValue
    private String planChangeMessage;
    @ValueMapValue
    private String manageLabel;

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getAutoRenewLabel() {
        return autoRenewLabel;
    }

    public String getRenewalLabel() {
        return renewalLabel;
    }

    public String getAutoRenewDesc() {
        return autoRenewDesc;
    }

    public String getAutoRenewTurnOnLabel() {
        return autoRenewTurnOnLabel;
    }

    public String getFetchDataCallback() {
        return fetchDataCallback;
    }

    public String getButtonText() {
        return buttonText;
    }

    public String getCancelLabel() {
        return cancelLabel;
    }

    public String getPlanChangeMessage() {
        return planChangeMessage;
    }

    public String getManageLabel() {
        return manageLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
