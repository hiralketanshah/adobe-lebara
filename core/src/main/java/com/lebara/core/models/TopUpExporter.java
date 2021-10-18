package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.SelectBean;
import com.day.cq.i18n.I18n;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
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

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

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

    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

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
        return (i18n == null ? "Top up Credit {0} added to cart " : i18n.get("lebara.emptycart.addedtocart.label"));
    }

    public String getPopUpCtaLabel() {
        return (i18n == null ? "View Cart" : i18n.get("lebara.viewcart.label"));
    }

    public List<String> getTopUpOptions() {
        return CFUtils.populateTopupInfo(resourceResolver.getResource(cfPath));
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
