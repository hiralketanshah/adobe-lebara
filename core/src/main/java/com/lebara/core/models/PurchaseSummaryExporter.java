package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PurchaseSummaryExporter.class,
        ComponentExporter.class }, resourceType = PurchaseSummaryExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PurchaseSummaryExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/nl/purchasesummary";

    @ScriptVariable
    protected Resource resource;
    
    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String title;
    
    @ValueMapValue
    private String monthText;
    
    @ValueMapValue
    private String monthsText;

    @ValueMapValue
    private String buttonLabel;
    
    @ValueMapValue
    private String buttonCTALink;
    
    @ValueMapValue
    private String editLabel;
    
    @ValueMapValue
    private String editCTALink;

    @ValueMapValue
    private String businessSubscriptionLabel;

    @ValueMapValue
    private String initialDiscountHeaderLabel;

    @ValueMapValue
    private String afterDiscountLabel;

    @ValueMapValue
    private String activationFeeLabel;

    @ValueMapValue
    private String discountLabel;
    
    @ValueMapValue
    private String totalLabel;
    
    @ValueMapValue
    private String activationFeeValue;
    
    @ValueMapValue
    private boolean isActivationFeeDiscount;
    
    @ValueMapValue
    private String headerLabel;
    
    @ValueMapValue
    private boolean enableFloatingCard;

    @ValueMapValue
    private String stickyPromoLabel;

    @ValueMapValue
    private String stickyActivationFeeLabel;

    @ValueMapValue
    private String stickyTotalLabel;
    
    @ValueMapValue
    private boolean isRetentionGrandTotal;
    
    @ValueMapValue
    private String termsAndConditionsContent;
    
    @ValueMapValue
    private String contractSummaryLabel;

    @ValueMapValue
    private String contractSummaryPdfRootPath;

    @ValueMapValue
    private String pdfDownloadLabel;

    @ValueMapValue
    private String pdfCloseLabel;

    private String appliedStyles;

    public String getTitle() {
        return title;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }
    
    public String getButtonCTALink() {
		return AemUtils.getLinkWithExtension(buttonCTALink);
	}

	public String getEditLabel() {
        return editLabel;
    }
    
    public String getEditCTALink() {
        return AemUtils.getLinkWithExtension(editCTALink);
    }

    public String getBusinessSubscriptionLabel() {
        return businessSubscriptionLabel;
    }

    public String getInitialDiscountHeaderLabel() {
        return initialDiscountHeaderLabel;
    }

    public String getAfterDiscountLabel() {
        return afterDiscountLabel;
    }

    public String getActivationFeeLabel() {
        return activationFeeLabel;
    }

    public String getDiscountLabel() {
        return discountLabel;
    }

    public String getHeaderLabel() {
		return headerLabel;
	}
    
	public String getMonthText() {
        return monthText;
    }

    public String getMonthsText() {
        return monthsText;
    }

    public String getTotalLabel() {
        return totalLabel;
    }

    public String getActivationFeeValue() {
        return activationFeeValue;
    }

    public boolean getIsActivationFeeDiscount() {
        return isActivationFeeDiscount;
    }
    
    public boolean getIsRetentionGrandTotal() {
        return isRetentionGrandTotal;
    }

    public boolean isEnableFloatingCard() {
        return enableFloatingCard;
    }

    public String getStickyPromoLabel() {
        return stickyPromoLabel;
    }

    public String getStickyActivationFeeLabel() {
        return stickyActivationFeeLabel;
    }

    public String getStickyTotalLabel() {
        return stickyTotalLabel;
    }

    public String getTermsAndConditionsContent() {
        return AemUtils.updateShortenLinksInRichText(termsAndConditionsContent,resourceResolver);
    }

    public String getContractSummaryLabel() {
        return contractSummaryLabel;
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

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
