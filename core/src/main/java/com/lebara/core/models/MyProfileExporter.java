package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.MyProfileErrorAndSuccessMsg;
import com.lebara.core.models.beans.MyProfileFormFields;
import com.lebara.core.models.beans.MyProfileSuccessEmailModal;
import com.lebara.core.models.beans.MyProfileAccountSetupPopup;
import com.lebara.core.models.beans.MyProfileChangeAddressPopup;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

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

    @ValueMapValue
    private String changeEmailHeading;

    @ValueMapValue
    private String changePasswordSuccessMsg;

    @ValueMapValue
    private String changeAddressButtonLabel;

    @ValueMapValue
    private String exceededLimitLabel;

    @ValueMapValue
    private String exceededLimitDesc;

    @ValueMapValue
    private String settingsUpdatedLabel;

    @ChildResource
    private MyProfileFormFields frmFields;

    @ChildResource
    private MyProfileErrorAndSuccessMsg validationMessages;

    @ChildResource
    private MyProfileSuccessEmailModal successEmailModal;

    @ChildResource
    private MyProfileChangeAddressPopup changeAddressPopup;
    
    @ChildResource
    private MyProfileAccountSetupPopup accountSetupPopup;

    @JsonProperty("frmFields")
    public MyProfileFormFields getFrmFields() {
        return frmFields;
    }

    @JsonProperty("validationMessages")
    public MyProfileErrorAndSuccessMsg getValidationMessages() {
        return validationMessages;
    }

    @JsonProperty("successEmailModal")
    public MyProfileSuccessEmailModal getSuccessEmailModal() { return successEmailModal; }

    @JsonProperty("changeAddressPopup")
    public MyProfileChangeAddressPopup getChangeAddressPopup() {
        return changeAddressPopup;
    }
    @JsonProperty("accountSetupPopup")
    public MyProfileAccountSetupPopup getAccountSetupPopup() {
		return accountSetupPopup;
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

    public String getChangeEmailHeading() {
        return changeEmailHeading;
    }

    public String getChangeAddressButtonLabel() {
        return changeAddressButtonLabel;
    }

    public String getExceededLimitLabel() {
        return exceededLimitLabel;
    }

    public String getExceededLimitDesc() {
        return exceededLimitDesc;
    }

    public String getSettingsUpdatedLabel() {
        return settingsUpdatedLabel;
    }

    public String getChangePasswordSuccessMsg() { return changePasswordSuccessMsg;}

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
