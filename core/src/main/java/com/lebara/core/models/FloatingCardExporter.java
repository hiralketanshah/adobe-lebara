package com.lebara.core.models;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { FloatingCardExporter.class,
        ComponentExporter.class }, resourceType = FloatingCardExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FloatingCardExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/nl/floatingcard";

    @SlingObject
    protected Resource resource;

    @ValueMapValue
    private String stickyPromoLabel;

    @ValueMapValue
    private String stickyActivationFeeLabel;

    @ValueMapValue
    private String stickyTotalLabel;

    @ValueMapValue
    private String buttonLabel;

    @ValueMapValue
    private String buttonCTALink;

    @ValueMapValue
    private boolean isActivationFeeDiscount;

    @ValueMapValue
    private String activationFeeValue;

    private String appliedStyles;

    public String getStickyPromoLabel() {
        return stickyPromoLabel;
    }

    public String getStickyActivationFeeLabel() {
        return stickyActivationFeeLabel;
    }

    public String getStickyTotalLabel() {
        return stickyTotalLabel;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getButtonCTALink() {
        return AemUtils.getLinkWithExtension(buttonCTALink);
    }

    public boolean getIsActivationFeeDiscount() {
        return isActivationFeeDiscount;
    }

    public String getActivationFeeValue() {
        return activationFeeValue;
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