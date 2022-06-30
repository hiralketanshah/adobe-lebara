package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.ImageIcon;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {OrderDetailsExporter.class, ComponentExporter.class},
        resourceType = OrderDetailsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OrderDetailsExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/orderdetails";

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String selectedProductLabel;

    @ValueMapValue
    private String phoneNumberLabel;

    @ValueMapValue
    private String missingInfoLabel;

    @ValueMapValue
    private String freeSimLabel;

    @ValueMapValue
    private String topupAutoRenewLabel;

    @ValueMapValue
    private String topupAutoRenewDesc;

    @ValueMapValue
    private String autoRenewLabel;

    @ValueMapValue
    private String prepaidAutoRenewDesc;

    @ValueMapValue
    private String postpaidAutoRenewDesc;

    @ValueMapValue
    private String grandTotalLabel;

    @ValueMapValue
    private String addVoucherCodeLabel;

    @ValueMapValue
    private String applyVoucherLabel;

    @ValueMapValue
    private String enterVoucherCodeLabel;

    @ValueMapValue
    private String voucherCodeInvalidMessage;

    @ValueMapValue
    private String voucherCodeExpiredMessage;

    @ValueMapValue
    private String voucherCodeDiscountLabel;

    @ValueMapValue
    private String consentLabel;

    @ValueMapValue
    private String privacyPolicyLabel;

    @ValueMapValue
    private String privacyPolicyLink;

    @ValueMapValue
    private String termsAndConditionsLabel;

    @ValueMapValue
    private String paymentMethodLabel;

    @ValueMapValue
    private String paymentButtonLabel;

    @ValueMapValue
    private String ctaContinueLabel;

    @ValueMapValue
    private String removeLabel;

    @ValueMapValue
    private String showDetailsLabel;

    @ValueMapValue
    private String viewPlansLabel;

    @ValueMapValue
    private String addToCartLabel;

    @ValueMapValue
    private String buyPlanLabel;

    @ValueMapValue
    private String changePlanLabel;

    @ValueMapValue
    private String changeAddonLabel;

    @ValueMapValue
    private String deleteCartItemTitle;

    @ValueMapValue
    private String deleteCartItemDesc;

    @ValueMapValue
    private String deleteCartItemYesButtonLabel;

    @ValueMapValue
    private String deleteCartItemNoButtonLabel;

    @ValueMapValue
    private String topUpCreditLabel;

    @ValueMapValue
    private String topUpRecommendedLabel;

    @ValueMapValue
    private String topUpCapLabel;

    @ValueMapValue
    private String topUpCapDesc;

    @ValueMapValue
    private String plansTitle;

    @ValueMapValue
    private String addonsTitle;

    @ValueMapValue
    private String selectPlanLabel;

    @ValueMapValue
    private Boolean hideChangePlan;

    @ValueMapValue
    private String personalDetailsLabel;

    @ValueMapValue
    private String nameLabel;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String mobileNumberLabel;

    @ValueMapValue
    private String shippingAddressLabel;

    @ValueMapValue
    private String editLabel;

    @ValueMapValue
    private String contractSummary;

    @ValueMapValue
    private String contractSummaryPdfRootPath;

    @ValueMapValue
    private String pdfDownloadLabel;

    @ValueMapValue
    private String pdfCloseLabel;

    @ValueMapValue
    private boolean showDeactivatedContent;

    @ValueMapValue
    private String alertMessageText;

    @ValueMapValue
    private String freeSimJourneyRoute;

    @ValueMapValue
    private String yourOrderOneTimeActivationFeeLabel;

    @ValueMapValue
    private String yourOrderOneTimeActivationFee;

    @ValueMapValue
    private String totalLabel;

    @ValueMapValue
    private int creditListCount;

    @ValueMapValue
    private boolean hideContract;

    @ValueMapValue
    private boolean showUpdatedAddressFormat;

    @ValueMapValue
    private String additionalDeliveryLabel;

    @ValueMapValue
    private boolean hideTermsAndConditions;

    public String getSelectedProductLabel() {
        return selectedProductLabel;
    }

    public String getPhoneNumberLabel() {
        return phoneNumberLabel;
    }

    public String getMissingInfoLabel() {
        return missingInfoLabel;
    }

    public String getFreeSimLabel() {
        return freeSimLabel;
    }

    public String getTopupAutoRenewLabel() {
        return topupAutoRenewLabel;
    }

    public String getAutoRenewLabel() {
        return autoRenewLabel;
    }

    public String getTopupAutoRenewDesc() {
        return topupAutoRenewDesc;
    }

    public String getPrepaidAutoRenewDesc() {
        return prepaidAutoRenewDesc;
    }

    public String getPostpaidAutoRenewDesc() {
        return postpaidAutoRenewDesc;
    }

    public String getGrandTotalLabel() {
        return grandTotalLabel;
    }

    public String getAddVoucherCodeLabel() {
        return addVoucherCodeLabel;
    }

    public String getApplyVoucherLabel() {
        return applyVoucherLabel;
    }

    public String getEnterVoucherCodeLabel() {
        return enterVoucherCodeLabel;
    }

    public String getVoucherCodeInvalidMessage() {
        return voucherCodeInvalidMessage;
    }

    public String getVoucherCodeExpiredMessage() {
        return voucherCodeExpiredMessage;
    }

    public String getVoucherCodeDiscountLabel() {
        return voucherCodeDiscountLabel;
    }

    public String getConsentLabel() {
        return AemUtils.updateShortenLinksInRichText(consentLabel,slingRequest);
    }

    public String getPrivacyPolicyLabel() {
        return privacyPolicyLabel;
    }

    public String getPrivacyPolicyLink() {
        return privacyPolicyLink;
    }

    public String getTermsAndConditionsLabel() {
        return AemUtils.updateShortenLinksInRichText(termsAndConditionsLabel,slingRequest);
    }

    public String getPaymentMethodLabel() {
        return paymentMethodLabel;
    }

    public String getPaymentButtonLabel() {
        return paymentButtonLabel;
    }

    public String getCtaContinueLabel() {
        return ctaContinueLabel;
    }

    public String getRemoveLabel() {
        return removeLabel;
    }

    public String getShowDetailsLabel() {
        return showDetailsLabel;
    }

    public String getViewPlansLabel() {
        return viewPlansLabel;
    }

    public String getAddToCartLabel() {
        return addToCartLabel;
    }

    public String getBuyPlanLabel() {
        return buyPlanLabel;
    }

    public String getChangePlanLabel() {
        return changePlanLabel;
    }

    public String getChangeAddonLabel() {
        return changeAddonLabel;
    }

    public String getDeleteCartItemTitle() {
        return deleteCartItemTitle;
    }

    public String getDeleteCartItemDesc() {
        return deleteCartItemDesc;
    }

    public String getDeleteCartItemYesButtonLabel() {
        return deleteCartItemYesButtonLabel;
    }

    public String getDeleteCartItemNoButtonLabel() {
        return deleteCartItemNoButtonLabel;
    }

    public String getTopUpCreditLabel() {
        return topUpCreditLabel;
    }

    public String getTopUpRecommendedLabel() {
        return topUpRecommendedLabel;
    }

    public String getTopUpCapLabel() {
        return topUpCapLabel;
    }

    public String getTopUpCapDesc() {
        return topUpCapDesc;
    }

    public String getPlansTitle() {
        return plansTitle;
    }

    public String getAddonsTitle() {
        return addonsTitle;
    }

    public String getSelectPlanLabel() {
        return selectPlanLabel;
    }

    public Boolean getHideChangePlan() {
        return hideChangePlan;
    }

    public String getPersonalDetailsLabel() {
        return personalDetailsLabel;
    }

    public String getNameLabel() {
        return nameLabel;
    }

    public String getEmailLabel() {
        return emailLabel;
    }

    public String getMobileNumberLabel() {
        return mobileNumberLabel;
    }

    public String getShippingAddressLabel() {
        return shippingAddressLabel;
    }

    public String getEditLabel() {
        return editLabel;
    }

    public String getContractSummary() {
        return contractSummary;
    }

    public String getContractSummaryPdfRootPath() {
        return contractSummaryPdfRootPath;
    }

    public String getPdfDownloadLabel() {
        return pdfDownloadLabel;
    }

    public String getPdfCloseLabel() {
        return pdfCloseLabel;
    }

    public boolean getShowDeactivatedContent() {
        return showDeactivatedContent;
    }

    public String getAlertMessageText() {
        return alertMessageText;
    }

    public String getFreeSimJourneyRoute() {
        return AemUtils.getLinkWithExtension(freeSimJourneyRoute, slingRequest);
    }
    public String getYourOrderOneTimeActivationFeeLabel() {
        return yourOrderOneTimeActivationFeeLabel;
    }

    public String getYourOrderOneTimeActivationFee() {
        return yourOrderOneTimeActivationFee;
    }

    public int getCreditListCount() {
        return creditListCount;
    }

    public boolean getHideContract() {
        return hideContract;
    }

    public boolean getShowUpdatedAddressFormat() {
        return showUpdatedAddressFormat;
    }

    public boolean getHideTermsAndConditions() {
        return hideTermsAndConditions;
    }

    public String getAdditionalDeliveryLabel() {
        return additionalDeliveryLabel ;
    }


    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
