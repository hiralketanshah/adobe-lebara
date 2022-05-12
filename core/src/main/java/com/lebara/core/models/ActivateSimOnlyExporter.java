package com.lebara.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.ErrorMessageFields;
import java.util.Map;
import java.util.HashMap;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {ActivateSimOnlyExporter.class, ComponentExporter.class},
        resourceType = ActivateSimOnlyExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ActivateSimOnlyExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/activatesimonly";

    @ScriptVariable
    private Resource resource;
    
    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String step1Heading;

    @ValueMapValue
    private String step1Subheading;

    @ValueMapValue
    private String step1InputPlaceholder;

    @ValueMapValue
    private String step1Description;

    @ValueMapValue
    private String mobileRequired;

    @ValueMapValue
    private String mobileInvalidMsg;

    @ValueMapValue
    private String step2Heading;

    @ValueMapValue
    private String step2Image;

    @ValueMapValue
    private String step2Subheading;

    @ValueMapValue
    private String step2InputPlaceholder;

    @ValueMapValue
    private String iccidRequired;

    @ValueMapValue
    private String iccidInvalidMsg;

    @ValueMapValue
    private String swrMessage;

    @ChildResource
    private List<ErrorMessageFields> activationErrorMessages;

    public String getHeading() {
        return heading;
    }

    public String getStep1Heading() {
        return step1Heading;
    }

    public String getStep1Subheading() {
        return step1Subheading;
    }

    public String getStep1InputPlaceholder() {
        return step1InputPlaceholder;
    }

    public String getMobileRequired() {
        return mobileRequired;
    }

    public String getMobileInvalidMsg() {
        return mobileInvalidMsg;
    }

    public String getStep2Heading() {
        return step2Heading;
    }

    public String getStep2Image() {
        return step2Image;
    }

    public String getStep2Subheading() {
        return step2Subheading;
    }

    public String getStep2InputPlaceholder() {
        return step2InputPlaceholder;
    }

    public String getIccidRequired() {
        return iccidRequired;
    }

    public String getIccidInvalidMsg() {
        return iccidInvalidMsg;
    }

    public String getSwrMessage() {
        return swrMessage;
    }

    public Map<String,String> getActivationErrorMessages() {
        if(activationErrorMessages != null && !activationErrorMessages.isEmpty()){
            Map<String,String> map = new HashMap<String,String>();
            activationErrorMessages.stream().forEach(item -> map.put(item.getErrorCode(), item.getErrorMessage()));
            return map;
        }
        return new HashMap<String,String>();
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
