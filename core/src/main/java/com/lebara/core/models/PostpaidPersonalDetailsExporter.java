package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.Exporter;
import com.adobe.cq.dam.cfm.ContentFragment;
import java.util.ArrayList;
import java.util.List;
import java.util.List;
import com.lebara.core.beans.*;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidPersonalDetailsExporter.class, ComponentExporter.class},
        resourceType = PostpaidPersonalDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidPersonalDetailsExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/postpaidpersonaldetails";

    @SlingObject
    private ResourceResolver resourceResolver;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private  String portingSectionHeading;

    @ValueMapValue
    private  String currentProviderList;
    
    @ChildResource
    private PostpaidPersonalDetailsFormFields frmFields;

    @ChildResource
    private  PostpaidPersonalDetailsErrorMsg validationMessages;

    public String getHeading() {
        return heading;
    }

    @JsonProperty("frmFields")
    public PostpaidPersonalDetailsFormFields getFrmFields() {
        return frmFields;
    }

    @JsonProperty("validationMessages")
    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }
    
    public String getPortingSectionHeading() {
        return portingSectionHeading;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public List<Object> getCurrentProvidersList() {
        if(currentProviderList != null) {
            Resource currentProvidersResource = resourceResolver.getResource(currentProviderList);
            ContentFragment currentProvidersFragment = currentProvidersResource.adaptTo(ContentFragment.class);
            if (null != currentProvidersFragment) {
                return CFUtils.convertStringArrayToList(CFUtils.getElementArrayValue(currentProvidersFragment, "currentProviderList"), Object.class);
            }
        }
        return new ArrayList<>();
    }

}
