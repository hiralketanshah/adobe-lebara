package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.Exporter;
import com.lebara.core.models.beans.*;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidPersonalDetailsExporter.class, ComponentExporter.class},
        resourceType = PostpaidPersonalDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidPersonalDetailsExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/postpaidpersonaldetails";

    @SlingObject
    private ResourceResolver resourceResolver;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private  String portingSectionHeading;

    @ValueMapValue
    private  String termsAndConditionsLabel;

    @ValueMapValue
    private String orderTotalLabel;
    @ValueMapValue
    private String yourOrdersimPlanLabel;
    @ValueMapValue
    private String yourOrderMinutesInGermanyValue;
    @ValueMapValue
    private String yourOrderContractdurationLabel;
    @ValueMapValue
    private String yourOrderDataLabel;
    @ValueMapValue
    private String yourOrderInternationalMinLabel;
    @ValueMapValue
    private String yourOrderMinutesInGermany;
    @ValueMapValue
    private String yourOrderPerMonthOrderTotalLabel;
    @ValueMapValue
    private String yourOrderOneTimeActivationFeeLabel;
    @ValueMapValue
    private String yourOrderOneTimeActivationFee;
    @ValueMapValue
    private String yourOrderMinutesLabel;
    @ValueMapValue
    private String yourOrderTwentyFourMonthsLabel;
    @ValueMapValue
    private String yourOrderOneMonthLabel;
    @ValueMapValue
    public String streetLabelErrorMax;
    @ValueMapValue
    public String houseNumberErrorMax;
    @ValueMapValue
    public String zipCodeErrorMax;
    @ValueMapValue
    public String zipCodeErrorMin;
    @ChildResource
    private PostpaidPersonalDetailsFormFields frmFields;

    @ChildResource
    private  PostpaidPersonalDetailsErrorMsg validationMessages;

    public String getHeading() {
        return heading;
    }

    @JsonProperty("frmFields")
    public PostpaidPersonalDetailsFormFields getFrmFields() {
        return frmFields;
    }

    @JsonProperty("validationMessages")
    public PostpaidPersonalDetailsErrorMsg getValidationMessages() {
        return validationMessages;
    }
    
    public String getPortingSectionHeading() {
        return portingSectionHeading;
    }

    public String getOrderTotalLabel() {
        return orderTotalLabel;
    }

    public String getYourOrderContractdurationLabel() {
        return yourOrderContractdurationLabel;
    }

    public String getYourOrderDataLabel() {
        return yourOrderDataLabel;
    }

    public String getYourOrderInternationalMinLabel() {
        return yourOrderInternationalMinLabel;
    }

    public String getYourOrderMinutesInGermany() {
        return yourOrderMinutesInGermany;
    }

    public String getYourOrderPerMonthOrderTotalLabel() {
        return yourOrderPerMonthOrderTotalLabel;
    }

    public String getYourOrderOneTimeActivationFeeLabel() {
        return yourOrderOneTimeActivationFeeLabel;
    }

    public String getYourOrderOneTimeActivationFee() {
        return yourOrderOneTimeActivationFee;
    }

    public String getYourOrdersimPlanLabel() {
        return yourOrdersimPlanLabel;
    }

    public String getYourOrderMinutesInGermanyValue() {
        return yourOrderMinutesInGermanyValue;
    }

    public String getTermsAndConditionsLabel() {
        return termsAndConditionsLabel;
    }

    public String getYourOrderMinutesLabel() {
        return yourOrderMinutesLabel;
    }

    public String getYourOrderTwentyFourMonthsLabel() {
        return yourOrderTwentyFourMonthsLabel;
    }

    public String getYourOrderOneMonthLabel() {
        return yourOrderOneMonthLabel;
    }
    
	public String getStreetLabelErrorMax() {
        return streetLabelErrorMax;
    }

    public String getHouseNumberErrorMax() {
        return houseNumberErrorMax;
    }

    public String getZipCodeErrorMin() {
        return zipCodeErrorMin;
    }

    public String getZipCodeErrorMax() {
        return zipCodeErrorMax;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }


}
