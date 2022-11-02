package com.lebara.core.models;

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
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.SetPasswordErrorCard;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {SetPasswordExporter.class, ComponentExporter.class},
resourceType = SetPasswordExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SetPasswordExporter implements ComponentExporter {
	
	protected static final String RESOURCE_TYPE = "lebara/components/nl/setuppassword";

	@ScriptVariable
    private Resource resource;
	
	@ValueMapValue
    private String pwdHelperMsg;
	
	@ValueMapValue
    private String pwdConfirmHelperMsg;
	
	@ValueMapValue
    private String pwdRequiredValidationMsg;
	
	@ValueMapValue
    private String pwdMinValdiationMsg;
	
	@ValueMapValue
    private String pwdMaxValdiationMsg;
	
	@ValueMapValue
    private String pwdConfirmRequiredValidationMsg;
	
	@ValueMapValue
    private String pwdConfirmMatchValidationMsg;
	
	@ValueMapValue
    private String frmBtnPrimaryLabel;
	
	@ValueMapValue
    private String frmLabelNewPwd;
	
	@ValueMapValue
    private String frmLabelReEnterNewPwd;
	
	@ValueMapValue
    private String compHeading;
	
	@ValueMapValue
    private String showLabel;
	
	@ValueMapValue
    private String hideLabel;
	
	@ValueMapValue
    private String errorPasswordPatternMinMsg;
	
	@ChildResource
    private SetPasswordErrorCard errorCard;

	@Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

	public String getPwdHelperMsg() {
		return pwdHelperMsg;
	}

	public String getPwdConfirmHelperMsg() {
		return pwdConfirmHelperMsg;
	}

	public String getPwdRequiredValidationMsg() {
		return pwdRequiredValidationMsg;
	}

	public String getPwdMinValdiationMsg() {
		return pwdMinValdiationMsg;
	}

	public String getPwdMaxValdiationMsg() {
		return pwdMaxValdiationMsg;
	}

	public String getPwdConfirmRequiredValidationMsg() {
		return pwdConfirmRequiredValidationMsg;
	}

	public String getPwdConfirmMatchValidationMsg() {
		return pwdConfirmMatchValidationMsg;
	}

	public String getFrmBtnPrimaryLabel() {
		return frmBtnPrimaryLabel;
	}

	public String getFrmLabelNewPwd() {
		return frmLabelNewPwd;
	}

	public String getFrmLabelReEnterNewPwd() {
		return frmLabelReEnterNewPwd;
	}

	public String getCompHeading() {
		return compHeading;
	}

	public String getShowLabel() {
		return showLabel;
	}

	public String getHideLabel() {
		return hideLabel;
	}

	public String getErrorPasswordPatternMinMsg() {
		return errorPasswordPatternMinMsg;
	}
	
	@JsonProperty("errorCard")
	public SetPasswordErrorCard getErrorCard() {
		return errorCard;
	}
	
	
}
