package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ViewPlanExporter.class, ComponentExporter.class},
        resourceType = ViewPlanExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ViewPlanExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/viewplans";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ChildResource
    protected Resource phases;

    @ValueMapValue
    private String buttonLabel;

    @ValueMapValue
    private String ctaDownloadLabel;

    @ValueMapValue
    private String ctaCloseLabel;

    @ValueMapValue
    private String minutesField;

    @ValueMapValue
    private String unlimitedTextField;
    
    @ValueMapValue
    private String title;
    
    @ValueMapValue
    private String showLabel;
    
    @ValueMapValue
    private String exploreAllLabel;
    
    @ValueMapValue
    private String exploreAllLink;

    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    public String getProductInformationButtonLabel() {
        return (i18n == null ? "Product Information" : i18n.get("product.information.label"));
    }

    public String getCtaDownloadLabel() {
        return ctaDownloadLabel;
    }

    public String getCtaCloseLabel() {
        return ctaCloseLabel;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getMinutesField() {
        return minutesField;
    }

    public String getUnlimitedTextField() {
        return unlimitedTextField;
    }

    public String getTitle() {
        return title;
    }

    public String getShowLabel() {
        return showLabel;
    }

    public String getExploreAllLabel() {
        return exploreAllLabel;
    }

    public String getExploreAllLink() {
        return AemUtils.getLinkWithExtension(exploreAllLink, slingRequest);
    }

    public List<OfferFragmentBean> getOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != phases) {
            offers = CFUtils.getCfList(phases, resourceResolver, i18n);
        }
        return offers;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
