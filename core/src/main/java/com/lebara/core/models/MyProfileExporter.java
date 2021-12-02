package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.Exporter;
import com.lebara.core.models.beans.*;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {MyProfileExporter.class, ComponentExporter.class},
        resourceType = MyProfileExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MyProfileExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/user/myprofile";

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String sectionUsernameHeading;

    @ValueMapValue
    private String sectionAddressHeading;

    @ValueMapValue
    private String sectionEmailPasswordHeading;

    @ValueMapValue
    private String sectionConsentHeading;

    @ChildResource
    private MyProfileFormFields frmFields;

    @ChildResource
    private MyProfileErrorAndSuccessMsg validationMessages;

    @JsonProperty("frmFields")
    public MyProfileFormFields getFrmFields() {
        return frmFields;
    }

    @JsonProperty("validationMessages")
    public MyProfileErrorAndSuccessMsg getValidationMessages() {
        return validationMessages;
    }

    public String getDescription() {
        return description;
    }

    public String getSectionUsernameHeading() {
        return sectionUsernameHeading;
    }

    public String getSectionEmailPasswordHeading()
    {
        return sectionEmailPasswordHeading;
    }

    public String getSectionAddressHeading()
    {
        return sectionAddressHeading;
    }

    public String getSectionConsentHeading()
    {
        return sectionConsentHeading;
    }

    public String getHeading() {
        return heading;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
