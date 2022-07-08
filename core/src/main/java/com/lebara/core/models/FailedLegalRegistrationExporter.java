package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {FailedLegalRegistrationExporter.class, ComponentExporter.class},
        resourceType = FailedLegalRegistrationExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FailedLegalRegistrationExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/failedlegalregistration";

    @ValueMapValue
    private String errorLegalRegistrationMessage;

    @ValueMapValue
    private String errorLegalRegistrationBody;

    @ValueMapValue
    private String dashboardButtonLabel;

    public String getErrorLegalRegistrationMessage() {
        return errorLegalRegistrationMessage;
    }

    public String getErrorLegalRegistrationBody() {
        return errorLegalRegistrationBody;
    }

    public String getDashboardButtonLabel() {
        return dashboardButtonLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
