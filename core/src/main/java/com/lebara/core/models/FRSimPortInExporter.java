package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FRSimPortInExporter.class, ComponentExporter.class},
        resourceType = FRSimPortInExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FRSimPortInExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/frsimportin";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String doitLaterButtonLabel;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String mobileNumberDesc;

    @ValueMapValue
    private String termsAndConditions;

    @ValueMapValue
    private String continueButtonLabel;

    @ValueMapValue
    private String cancelbuttonlabel;

    @ValueMapValue
    private String mobileNumberErrorMessage;

    @ValueMapValue
    private String mobileNumberFieldPattern;

    public String getDoitLaterButtonLabel() {
        return doitLaterButtonLabel;
    }

    public String getTitle() {
        return title;
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getMobileNumberDesc() {
        return mobileNumberDesc;
    }


    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public String getContinueButtonLabel() {
        return continueButtonLabel;
    }

    public String getCancelbuttonlabel() {
        return cancelbuttonlabel;
    }


    public String getMobileNumberErrorMessage() {
        return mobileNumberErrorMessage;
    }


    public String getMobileNumberFieldPattern() {
        return mobileNumberFieldPattern;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
