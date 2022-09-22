package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PurchaseSummaryExporter.class,
        ComponentExporter.class }, resourceType = PurchaseSummaryExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PurchaseSummaryExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/purchasesummary";

    @ScriptVariable
    protected Resource resource;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String buttonLabel;

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

    private String appliedStyles;

    public String getTitle() {
        return title;
    }

    public String getButtonLabel() {
        return buttonLabel;
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

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

}
