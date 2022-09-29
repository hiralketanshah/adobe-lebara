package com.lebara.core.models;

import java.util.Optional;

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
import com.adobe.cq.wcm.style.ComponentStyleInfo;
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
	
	@ValueMapValue
	private String redirectAddress;

	@ValueMapValue
	private String portingSectionHeading;
	
	@ValueMapValue
    private boolean hideOrderSummary;

    @ValueMapValue
    private boolean hideConsentTrustworthy;
    
    @ValueMapValue
    private boolean hideAddressSection;
    
    @ValueMapValue
    private boolean numberInSimOnly;
    
    @ValueMapValue
    private boolean hideInternalHeading;
    
    @ValueMapValue
    private boolean formPaddingsForCardMode;
    
    @ValueMapValue
    private boolean bigHeading;
    
    @ValueMapValue
    private boolean showTitle;
    
    @ValueMapValue
    private boolean customFormFieldOrder;
    
    @ValueMapValue
    private boolean alreadyEmailNavigateToAddress;
    
    @ValueMapValue
    private boolean dobSelectsMode;
    
    private String appliedStyles;
    
    @ChildResource
    private  PostpaidPersonalDetailsErrorMsg validationMessages;
	
	public String getRedirectAddress() {
		return redirectAddress;
	}

	public String getPortingSectionHeading() {
		return portingSectionHeading;
	}
	
	@JsonProperty("frmFields")
    public PostpaidBuyPersonalDetailsFormFields getFrmFields() {
        return frmFields;
    }
	
	@JsonProperty("validationMessages")
    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }
	
	public boolean isHideOrderSummary() {
		return hideOrderSummary;
	}

	public boolean isHideConsentTrustworthy() {
		return hideConsentTrustworthy;
	}

	public boolean isHideAddressSection() {
		return hideAddressSection;
	}

	public boolean isNumberInSimOnly() {
		return numberInSimOnly;
	}

	public boolean isHideInternalHeading() {
		return hideInternalHeading;
	}

	public boolean isFormPaddingsForCardMode() {
		return formPaddingsForCardMode;
	}

	public boolean isBigHeading() {
		return bigHeading;
	}

	public boolean isShowTitle() {
		return showTitle;
	}

	public boolean isDobSelectsMode() {
		return dobSelectsMode;
	}

	public boolean isCustomFormFieldOrder() {
		return customFormFieldOrder;
	}

	public boolean isAlreadyEmailNavigateToAddress() {
		return alreadyEmailNavigateToAddress;
	}

	public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }
	
	@Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
