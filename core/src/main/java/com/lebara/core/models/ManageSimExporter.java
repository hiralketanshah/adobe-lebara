package com.lebara.core.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.ErrorMessageFields;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { ManageSimExporter.class,
        ComponentExporter.class }, resourceType = ManageSimExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ManageSimExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/managesim";

    @ValueMapValue
    private String followLinkLabel;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String noLabel;

    @ValueMapValue
    private String mailNotReceivedLabel;

    @ValueMapValue
    private String clickHereLabel;

    @ValueMapValue
    private String confirmationEmailLabel;

    @ValueMapValue
    private String linkSimLabel;

    @ValueMapValue
    private boolean showTermsAndConditions;

    @ValueMapValue
    private String delinkConfirmationMsg;

    @ValueMapValue
    private boolean textIsRich;

    @ValueMapValue
    private String mobilePlaceholderLabel;

    @ValueMapValue
    private String termsAndConditionsLabel;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String linkedSimDesc;

    @ValueMapValue
    private String delinkLabel;

    @ValueMapValue
    private String noSimLabel;

    @ValueMapValue
    private String activeMonthPlanLabel;

    @ValueMapValue
    private String toResendLabel;

    @ValueMapValue
    private String attachNewSim;
    
    @ValueMapValue
    private String description;
    
    @ValueMapValue
    private boolean showUpdatedModal;

    @ChildResource
    private List<ErrorMessageFields> sendSMSOtpErrorMessages;

    public String getFollowLinkLabel() {
        return followLinkLabel;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getNoLabel() {
        return noLabel;
    }

    public String getMailNotReceivedLabel() {
        return mailNotReceivedLabel;
    }

    public String getClickHereLabel() {
        return clickHereLabel;
    }

    public String getConfirmationEmailLabel() {
        return confirmationEmailLabel;
    }

    public String getLinkSimLabel() {
        return linkSimLabel;
    }

    public boolean isShowTermsAndConditions() {
        return showTermsAndConditions;
    }

    public String getDelinkConfirmationMsg() {
        return delinkConfirmationMsg;
    }

    public boolean isTextIsRich() {
        return textIsRich;
    }

    public String getMobilePlaceholderLabel() {
        return mobilePlaceholderLabel;
    }

    public String getTermsAndConditionsLabel() {
        return termsAndConditionsLabel;
    }

    public String getTitle() {
        return title;
    }

    public String getLinkedSimDesc() {
        return linkedSimDesc;
    }

    public String getDelinkLabel() {
        return delinkLabel;
    }

    public String getNoSimLabel() {
        return noSimLabel;
    }

    public String getActiveMonthPlanLabel() {
        return activeMonthPlanLabel;
    }

    public String getToResendLabel() {
        return toResendLabel;
    }

    public String getAttachNewSim() {
        return attachNewSim;
    }
    
    public String getDescription() {
		return description;
	}
    
    public boolean getShowUpdatedModal() {
		return showUpdatedModal;
	}

    public Map<String, String> getSendSMSOtpErrorMessages() {
        Map<String, String> map = new HashMap<String, String>();
        if (sendSMSOtpErrorMessages != null && !sendSMSOtpErrorMessages.isEmpty()) {
            sendSMSOtpErrorMessages.forEach(item -> map.put(item.getErrorCode(), item.getErrorMessage()));
        }
        return map;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
