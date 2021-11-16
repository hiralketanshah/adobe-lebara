package com.lebara.core.models;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.beans.PostpaidPersonalDetailsErrorMsg;
import com.lebara.core.beans.PostpaidPersonalDetailsFormFields;
import com.lebara.core.beans.SuccessMessage;
import com.lebara.core.utils.AemUtils;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {VerifyRegisterMobileExporter.class, ComponentExporter.class},
        resourceType = VerifyRegisterMobileExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class VerifyRegisterMobileExporter implements ComponentExporter {

    private static final String LABEL2 = "label2";

	private static final String LABEL1 = "label1";

	protected static final String RESOURCE_TYPE = "lebara/components/verifymobile";
    
    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    /**
     * Verify Mobile Number  Fields
     */
    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subHeading;

    @ChildResource
    private PostpaidPersonalDetailsFormFields frmFields;
    
    @ChildResource
    private PostpaidPersonalDetailsErrorMsg validationMessages;
    
    @ChildResource
    private SuccessMessage successMessages;
    
    @ChildResource
    private Resource timeCounter;
    
	public String getHeading() {
		return heading;
	}
	
	public String getSubHeading() {
		return subHeading;
	}

	public PostpaidPersonalDetailsFormFields getFrmFields() {
		return frmFields;
	}

	public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
		return validationMessages;
	}

	public Map<String,String> getTimeCounter() {
		Map<String,String> timeCounterMap = new HashMap<>();
		if(timeCounter != null) {
			timeCounterMap.put(LABEL1, AemUtils.getStringProperty(timeCounter, LABEL1));
			timeCounterMap.put(LABEL2, AemUtils.getStringProperty(timeCounter, LABEL2));
		}
		return timeCounterMap;
	}
	
	public SuccessMessage getSuccessMessages() {
		return successMessages;
	}
	
	@Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
