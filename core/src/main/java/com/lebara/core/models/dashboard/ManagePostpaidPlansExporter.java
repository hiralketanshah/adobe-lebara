package com.lebara.core.models.dashboard;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.DashboardLabels;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ManagePostpaidPlansExporter.class, ComponentExporter.class},
        resourceType = ManagePostpaidPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ManagePostpaidPlansExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/managepostpaidplans";

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String renewalLabel;

    @ValueMapValue
    private String planChangeMessage;

    @ValueMapValue
    private String cancelLabel;

    @ValueMapValue
    private String manageLabel;

    @ValueMapValue
    private String manageLink;

    @ValueMapValue
    private String autoRenewLabel;

    @ValueMapValue
    private String autoRenewDesc;

    @ValueMapValue
    private String buttonText;

    @ValueMapValue
    private Boolean hidePrice;

    @ValueMapValue
    private Boolean hideAutoRenew;

    @ValueMapValue
    private Boolean showTabData;

    @ValueMapValue
    private Boolean showManageButton;

    @ValueMapValue
    private Boolean requestPlanRemoved;

    @ValueMapValue
    private String planChangeTitle;

    @ValueMapValue
    private String planChangeDesc;

    @ValueMapValue
    private String termsConsentLabel;

    @ValueMapValue
    private String termsConditionsLabel;

    @ValueMapValue
    private String termsConditionsLink;

    @ValueMapValue
    private String contractConsentLabel;

    @ValueMapValue
    private String confirmLabel;

    @ValueMapValue
    private String allActivePlansLabel;

    @ValueMapValue
    private String planLabelsCfPath;

    public String getRenewalLabel() {return renewalLabel;}

    public String getPlanChangeMessage() {
        return planChangeMessage;
    }

    public String getCancelLabel() {
        return cancelLabel;
    }

    public String getManageLabel() {
        return manageLabel;
    }

    public String getManageLink() {
        return AemUtils.getLinkWithExtension(manageLink, request);
    }

    public String getAutoRenewLabel() {
        return autoRenewLabel;
    }

    public String getAutoRenewDesc() {
        return autoRenewDesc;
    }

    public String getButtonText() {
        return buttonText;
    }

    public Boolean getHidePrice() {
        return hidePrice;
    }

    public Boolean getShowTabData() {
        return showTabData;
    }

    public Boolean getHideAutoRenew() {
        return hideAutoRenew;
    }

    public Boolean getShowManageButton() {
        return showManageButton;
    }

    public Boolean getRequestPlanRemoved() {
        return requestPlanRemoved;
    }

    public String getPlanChangeTitle() {
        return planChangeTitle;
    }

    public String getPlanChangeDesc() {
        return planChangeDesc;
    }

    public String getTermsConsentLabel() {
        return termsConsentLabel;
    }

    public String getTermsConditionsLabel() {
        return termsConditionsLabel;
    }

    public String getTermsConditionsLink() {
        return AemUtils.getLinkWithExtension(termsConditionsLink, request);
    }

    public String getContractConsentLabel() {
        return contractConsentLabel;
    }

    public String getConfirmLabel() {
        return confirmLabel;
    }

    public String getAllActivePlansLabel() {
        return allActivePlansLabel;
    }
    public DashboardLabels getPlanLabels() {
        return AemUtils.populateDashboardLabels(request);
    }
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
