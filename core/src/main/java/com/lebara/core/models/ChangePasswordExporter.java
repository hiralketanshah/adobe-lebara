package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.ChangePasswordErrorAndSuccessMsg;
import com.lebara.core.models.beans.ChangePasswordFormFields;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ChangePasswordExporter.class, ComponentExporter.class},
        resourceType = ChangePasswordExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ChangePasswordExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/user/changepassword";

    @ValueMapValue
    private String changePasswordHeading;

    @ChildResource
    private ChangePasswordFormFields frmFields;


    @ChildResource
    private ChangePasswordErrorAndSuccessMsg validationMessages;


    @JsonProperty("frmFields")
    public ChangePasswordFormFields getFrmFields() {
        return frmFields;
    }

    @JsonProperty("validationMessages")
    public ChangePasswordErrorAndSuccessMsg getValidationMessages() {
        return validationMessages;
    }

    public String getChangePasswordHeading() {
        return changePasswordHeading;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
