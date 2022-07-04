package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FRSimPortInExporter.class, ComponentExporter.class},
        resourceType = FRSimPortInExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FRSimPortInExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/frsimportin";

    @ValueMapValue
    private String doitLaterButtonLabel;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String mobileNumberDesc;

    @ValueMapValue
    private String termsAndConditions;

    @ValueMapValue
    private String continueButtonLabel;

    @ValueMapValue
    private String mobileNumberErrorMessage;

    @ValueMapValue
    private String mobileNumberFieldPattern;

    @ValueMapValue
    private String rioCodeLabel;
    @ValueMapValue
    private String portDateLabel;
    @ValueMapValue
    private String rioCodePlaceHolder;
    @ValueMapValue
    private String portDatePlaceHolder;
    @ValueMapValue
    private String rioErrorMessage;
    @ValueMapValue
    private String portDateErrorMessage;
    @ValueMapValue
    private String portNotAllowedErrorMessage;
    @ValueMapValue
    private String rioCodeDesc;
    @ValueMapValue
    private String portDateDesc;
    @ValueMapValue
    private boolean weekStartFromMonday;
    @ValueMapValue
    private boolean blockSunday;

    public String getDoitLaterButtonLabel() {
        return doitLaterButtonLabel;
    }

    public String getTitle() {
        return title;
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getMobileNumberDesc() {
        return mobileNumberDesc;
    }


    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public String getContinueButtonLabel() {
        return continueButtonLabel;
    }

    public String getMobileNumberErrorMessage() {
        return mobileNumberErrorMessage;
    }


    public String getMobileNumberFieldPattern() {
        return mobileNumberFieldPattern;
    }

    public String getRioCodeLabel() {
        return rioCodeLabel;
    }

    public String getPortDateLabel() {
        return portDateLabel;
    }

    public String getRioCodePlaceHolder() {
        return rioCodePlaceHolder;
    }

    public String getPortDatePlaceHolder() {
        return portDatePlaceHolder;
    }

    public String getRioErrorMessage() {
        return rioErrorMessage;
    }

    public String getPortDateErrorMessage() {
        return portDateErrorMessage;
    }

    public String getPortNotAllowedErrorMessage() {
        return portNotAllowedErrorMessage;
    }

    public String getRioCodeDesc() {
        return rioCodeDesc;
    }

    public String getPortDateDesc() {
        return portDateDesc;
    }

    public boolean getWeekStartFromMonday() {
        return weekStartFromMonday;
    }

    public boolean getBlockSunday() {
        return blockSunday;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
