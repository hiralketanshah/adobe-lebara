package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {TopUpExporter.class, ComponentExporter.class},
        resourceType = TopUpExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TopUpExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/topup";

    @ValueMapValue
    private String leftTitle;
    @ValueMapValue
    private String leftSubTitle;
    @ValueMapValue
    private String rightTitle;
    @ValueMapValue
    private String rightSubTitle;
    @ValueMapValue
    private String addToCart;
    @ValueMapValue
    private String buyTopUp;

    private String topupAmount;

    public String getLeftTitle() {
        return leftTitle;
    }

    public String getLeftSubTitle() {
        return leftSubTitle;
    }

    public String getRightTitle() {
        return rightTitle;
    }

    public String getRightSubTitle() {
        return rightSubTitle;
    }

    public String getAddToCart() {
        return addToCart;
    }

    public String getBuyTopUp() {
        return buyTopUp;
    }

    public String getTopupAmount() {
        return topupAmount;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
