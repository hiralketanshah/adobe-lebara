package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {LoginExporter.class, ComponentExporter.class},
        resourceType = CreateNewPasswordExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CreateNewPasswordExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/createnewpassword";
    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String loginModuleType;


    @ValueMapValue
    private String alertSuccessSuffixMsg;

    @ValueMapValue
    private String compHeading;

    @ValueMapValue
    private String compHeadingDescription;

    @ValueMapValue
    private String frmLabelPin;

    @ValueMapValue
    private String  compResendPinText;

    @ValueMapValue
    private String  frmLabelNewPwd;

    @ValueMapValue
    private String  pwdMinHint;

    @ValueMapValue
    private String  frmLabelReEnterNewPwd;

    @ValueMapValue
    private String  showLabel;

    @ValueMapValue
    private String  hideLabel;

    @ValueMapValue
    private String  frmBtnPrimaryLabel;

    @ValueMapValue
    private String  frmBtnSecondaryLabel ;

    @ValueMapValue
    private String  registrationCtaLink;

    @ValueMapValue
    private String  pinRequiredValidationMsg;

    @ValueMapValue
    private String  pinLengthValidationMsg;

    @ValueMapValue
    private String  pwdRequiredValidationMsg;

    @ValueMapValue
    private String  pwdMinValdiationMsg;

    @ValueMapValue
    private String  pwdConfirmRequiredValidationMsg;

    @ValueMapValue
    private String  pwdConfirmMatchValidationMsg ;

    public String getAlertSuccessSuffixMsg() {
        return alertSuccessSuffixMsg;
    }

    public String getCompHeading() {
        return compHeading;
    }

    public String getCompHeadingDescription() {
        return compHeadingDescription;
    }


    public String getFrmLabelPin() {
        return frmLabelPin;
    }

    public String getCompResendPinText() {
        return compResendPinText;
    }

    public String getFrmLabelNewPwd() {
        return frmLabelNewPwd;
    }

    public String getPwdMinHint() {
        return pwdMinHint;
    }

    public String getFrmLabelReEnterNewPwd() {
        return frmLabelReEnterNewPwd;
    }

    public String getShowLabel() {
        return showLabel;
    }

    public String getHideLabel() {
        return hideLabel;
    }

    public String getFrmBtnPrimaryLabel() {
        return frmBtnPrimaryLabel;
    }

    public String getFrmBtnSecondaryLabel() {
        return frmBtnSecondaryLabel;
    }

    public String getRegistrationCtaLink() {
        return registrationCtaLink;
    }

    public String getPinRequiredValidationMsg() {
        return pinRequiredValidationMsg;
    }

    public String getPinLengthValidationMsg() {
        return pinLengthValidationMsg;
    }

    public String getPwdRequiredValidationMsg() {
        return pwdRequiredValidationMsg;
    }

    public String getPwdMinValdiationMsg() {
        return pwdMinValdiationMsg;
    }

    public String getPwdConfirmRequiredValidationMsg() {
        return pwdConfirmRequiredValidationMsg;
    }

    public String getPwdConfirmMatchValidationMsg() {
        return pwdConfirmMatchValidationMsg;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
