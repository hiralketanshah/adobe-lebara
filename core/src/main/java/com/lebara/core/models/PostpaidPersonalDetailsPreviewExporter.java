package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidPersonalDetailsPreviewExporter.class,
        ComponentExporter.class}, resourceType = PostpaidPersonalDetailsPreviewExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidPersonalDetailsPreviewExporter extends IntroExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/postpaidpersonaldetailspreview";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String notMigratedToFmvnoErrorMessage;

    @ValueMapValue
    private String fNameLabel;

    @ValueMapValue
    private String lNameLabel;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String dobLabel;

    @ValueMapValue
    private String address;

    @ValueMapValue
    private String portingSectionHeading;

    @ValueMapValue
    private String customerSupportText;

    @ValueMapValue
    private String productAndServicePreviewText;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String orderTotalLabel;

    @ValueMapValue
    private String paymentMethodLabel;

    @ValueMapValue
    private String yourOrdersimPlanLabel;

    @ValueMapValue
    private String yourOrderMinutesLabel;

    @ValueMapValue
    private String yourOrderTwentyFourMonthsLabel;

    @ValueMapValue
    private String yourOrderOneMonthLabel;

    @ValueMapValue
    private String yourOrderContractdurationLabel;

    @ValueMapValue
    private String yourOrderDataLabel;

    @ValueMapValue
    private String yourOrderInternationalMinLabel;

    @ValueMapValue
    private String yourOrderMinutesInGermany;

    @ValueMapValue
    private String yourOrderMinutesInGermanyValue;

    @ValueMapValue
    private String yourOrderPerMonthOrderTotalLabel;

    @ValueMapValue
    private String yourOrderOneTimeActivationFeeLabel;

    @ValueMapValue
    private String yourOrderOneTimeActivationFee;

    @ValueMapValue
    private String productAndServiceDescription;

    @ValueMapValue
    private String privacyPolicyTextDescription;

    @ValueMapValue
    private String termsAndConditionsLabel;

    public String getfNameLabel() {
        return fNameLabel;
    }

    public String getlNameLabel() {
        return lNameLabel;
    }

    public String getEmailLabel() {
        return emailLabel;
    }

    public String getDobLabel() {
        return dobLabel;
    }

    public String getAddress() {
        return address;
    }

    public String getPortingSectionHeading() {
        return portingSectionHeading;
    }

    public String getCustomerSupportText() {
        return customerSupportText;
    }

    public String getProductAndServicePreviewText() {
        return productAndServicePreviewText;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getOrderTotalLabel() {
        return orderTotalLabel;
    }

    public String getPaymentMethodLabel() {
        return paymentMethodLabel;
    }

    public String getYourOrdersimPlanLabel() {
        return yourOrdersimPlanLabel;
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

    public String getYourOrderMinutesInGermanyValue() {
        return yourOrderMinutesInGermanyValue;
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

    public String getProductAndServiceDescription() {
        return AemUtils.updateShortenLinksInRichText(productAndServiceDescription,slingRequest);
    }

    public String getPrivacyPolicyTextDescription() {
        return AemUtils.updateShortenLinksInRichText(privacyPolicyTextDescription,slingRequest);
    }
    
    public String getTermsAndConditionsLabel() {
    	return AemUtils.updateShortenLinksInRichText(termsAndConditionsLabel,slingRequest);
    }

    public String getNotMigratedToFmvnoErrorMessage() {
        return notMigratedToFmvnoErrorMessage;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
