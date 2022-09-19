package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { FailedOrderExporter.class,
        ComponentExporter.class }, resourceType = FailedOrderExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FailedOrderExporter implements ComponentExporter  {

	/**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/failedorder";
    
    private static final Logger LOGGER = LoggerFactory.getLogger(FailedOrderExporter.class);
    
    @SlingObject
    private SlingHttpServletRequest request;
    
    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String errorMessage;
    
    @ValueMapValue
    private String errorBody;
    
    @ValueMapValue
    private String dashboardButtonLabel;
    
    @ValueMapValue
    private String ctaLinkSuccessCard;

	public String getErrorMessage() {
		return errorMessage;
	}

	public String getErrorBody() {
		return errorBody;
	}

	public String getDashboardButtonLabel() {
		return dashboardButtonLabel;
	}

	public String getCtaLinkSuccessCard() {
		return AemUtils.getLinkWithExtension(ctaLinkSuccessCard, request);
	}
    
	@Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
