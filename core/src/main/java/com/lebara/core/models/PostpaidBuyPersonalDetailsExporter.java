package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.PostpaidBuyPersonalDetailsFormFields;
import com.lebara.core.models.beans.PostpaidPersonalDetailsErrorMsg;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidBuyPersonalDetailsExporter.class, ComponentExporter.class},
resourceType = PostpaidBuyPersonalDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidBuyPersonalDetailsExporter implements ComponentExporter {

	protected static final String RESOURCE_TYPE = "lebara/components/postpaidbuypersonaldetails";
	
	@ScriptVariable
    private Resource resource;
	@ChildResource
    private PostpaidBuyPersonalDetailsFormFields frmFields;

    @ChildResource
    private  PostpaidPersonalDetailsErrorMsg validationMessages;
	
	@JsonProperty("frmFields")
    public PostpaidBuyPersonalDetailsFormFields getFrmFields() {
        return frmFields;
    }
	
	@JsonProperty("validationMessages")
    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }
	
	@Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
