package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.FormFields;
import com.lebara.core.models.beans.ValidationMsg;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {CreateAccountExporter.class, ComponentExporter.class},
        resourceType = CreateAccountExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CreateAccountExporter extends IntroExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/createaccount";


    @ChildResource
    private ValidationMsg validationMessages;

    @ChildResource
    private FormFields frmFields;

    @ValueMapValue
    private String subHeading;


    public String getSubHeading() {
        return subHeading;
    }

    public FormFields getFrmFields() {
        return frmFields;
    }

    public ValidationMsg getValidationMessages() {
        return validationMessages;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
