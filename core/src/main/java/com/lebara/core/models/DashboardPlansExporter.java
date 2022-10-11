package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DashboardPlansExporter.class, ComponentExporter.class},
        resourceType = DashboardPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DashboardPlansExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/dashboardplans";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String buttonLabel;
    @ValueMapValue
    private String autoRenewLabel;
    @ValueMapValue
    private String renewalLabel;
    @ValueMapValue
    private String autoRenewDesc;
    @ValueMapValue
    private String autoRenewTurnOnLabel;
    @ValueMapValue
    private String buttonText;
    @ValueMapValue
    private String cancelLabel;
    @ValueMapValue
    private String planChangeMessage;
    @ValueMapValue
    private String manageLabel;

    @ValueMapValue
    private String cancelChangePlanHeading;
    @ValueMapValue
    private String cancelChangePlanSubHeading;
    @ValueMapValue
    private String cancelChangePlanCheckboxTop;
    @ValueMapValue
    private String cancelChangePlanCheckboxBottom;
    @ValueMapValue
    private String cancelChangePlanConfirmLabel;
    @ValueMapValue
    private String cancelChangePlanCancelLabel;
    @ValueMapValue
    private boolean showPlansWithProgress;
    @ValueMapValue
    private String dataValue;
    @ValueMapValue
    private String minutesValue;
    @ValueMapValue
    private String smsValue;
    @ValueMapValue
    private String leftOfLabel;
    @ValueMapValue
    private String validLabel;
    @ValueMapValue
    private String dataTabName;
    @ValueMapValue
    private String minTabName;
    @ValueMapValue
    private String smsTabName;
    @ValueMapValue
    private String internationalMinTabName;
    @ValueMapValue @Default(values="{0} {1} Used")
    private String usedLabel;

    @ValueMapValue
    private String cantChangePlanLastMonthMessage;
    @ValueMapValue
    private String cantChangePlanActivePromoMessage;
    @ValueMapValue
    private String newPlanTitle;
    @ValueMapValue
    private String pendingRetentionLabel;
    @ValueMapValue
    private String activeRetentionBanner;
    
    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getAutoRenewLabel() {
        return autoRenewLabel;
    }

    public String getRenewalLabel() {
        return renewalLabel;
    }

    public String getAutoRenewDesc() {
        return autoRenewDesc;
    }

    public String getAutoRenewTurnOnLabel() {
        return autoRenewTurnOnLabel;
    }

    public String getButtonText() {
        return buttonText;
    }

    public String getCancelLabel() {
        return cancelLabel;
    }

    public String getPlanChangeMessage() {
        return planChangeMessage;
    }

    public String getManageLabel() {
        return manageLabel;
    }

    public String getCancelChangePlanHeading() {
        return cancelChangePlanHeading;
    }

    public String getCancelChangePlanSubHeading() {
        return cancelChangePlanSubHeading;
    }

    public String getCancelChangePlanCheckboxTop() {
        return AemUtils.updateShortenLinksInRichText(cancelChangePlanCheckboxTop, slingRequest);
    }

    public String getCancelChangePlanCheckboxBottom() {
        return AemUtils.updateShortenLinksInRichText(cancelChangePlanCheckboxBottom, slingRequest);
    }

    public String getCancelChangePlanConfirmLabel() {
        return cancelChangePlanConfirmLabel;
    }

    public String getCancelChangePlanCancelLabel() {
        return cancelChangePlanCancelLabel;
    }

    public boolean getShowPlansWithProgress() {
        return showPlansWithProgress;
    }

    public String getDataValue() {
        return dataValue;
    }

    public String getMinutesValue() {
        return minutesValue;
    }

    public String getSmsValue() {
        return smsValue;
    }

    public String getLeftOfLabel() {
        return leftOfLabel;
    }

    public String getValidLabel() {
        return validLabel;
    }

    public String getDataTabName() {
        return dataTabName;
    }

    public String getMinTabName() {
        return minTabName;
    }

    public String getSmsTabName() {
        return smsTabName;
    }

    public String getInternationalMinTabName() {
        return internationalMinTabName;
    }

    public String getUsedLabel() {
        return usedLabel;
    }

    public String getCantChangePlanLastMonthMessage() {
		return cantChangePlanLastMonthMessage;
	}

	public String getCantChangePlanActivePromoMessage() {
		return cantChangePlanActivePromoMessage;
	}
    
    public String getNewPlanTitle() {
		return newPlanTitle;
	}

	public String getPendingRetentionLabel() {
		return pendingRetentionLabel;
	}

	public String getActiveRetentionBanner() {
		return activeRetentionBanner;
	}

	@Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
