package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {TopUpExporter.class, ComponentExporter.class},
        resourceType = TopUpExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TopUpExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/topup";
    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    @Named("leftTitle")
    private String heading;

    @ValueMapValue
    @Named("leftSubTitle")
    private String subheading;

    @ValueMapValue
    private String rightTitle;
    @ValueMapValue
    private String rightSubTitle;
    @ValueMapValue
    private String buyTopUpLabel;
    @ValueMapValue
    private String addToCartLabel;
    @ValueMapValue
    private String popUpCartMessage;
    @ValueMapValue
    private String popUpCtaLabel;
    @ValueMapValue
    private String cfPath;

    private List<String> topUpOptions;

    public String getHeading() {
        return heading;
    }

    public String getSubheading() {
        return subheading;
    }

    public String getRightTitle() {
        return rightTitle;
    }

    public String getRightSubTitle() {
        return rightSubTitle;
    }

    public String getBuyTopUpLabel() {
        return buyTopUpLabel;
    }

    public String getAddToCartLabel() {
        return addToCartLabel;
    }

    public String getPopUpCartMessage() {
        return popUpCartMessage;
    }

    public String getPopUpCtaLabel() {
        return popUpCtaLabel;
    }

    public List<String> getTopUpOptions() {
        return CFUtils.populateTopupInfo(resourceResolver.getResource(cfPath));
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
