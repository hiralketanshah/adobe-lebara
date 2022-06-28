package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.dto.PlanInfo;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {DetailedViewPlanExporter.class, ComponentExporter.class},
        resourceType = DetailedViewPlanExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DetailedViewPlanExporter extends ViewPlanExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/detailedviewplans";

    private static final Logger LOGGER = LoggerFactory.getLogger(DetailedViewPlanExporter.class);

    @SlingObject
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String subTitle;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String showLabel;

    @ValueMapValue
    private String hideLabel;

    @ValueMapValue
    private String ctaTopLabel;

    @ValueMapValue
    private String ctaTopLink;

    @ValueMapValue
    private String ctaBottomLabel;

    @ValueMapValue
    private String ctaBottomLink;

    @ValueMapValue
    private String backgroundColor;

    @ValueMapValue
    private String ctaDownloadLabel;

    @ValueMapValue
    private String ctaCloseLabel;

    @ValueMapValue
    private String textAlignment;

    @ValueMapValue
    private int columnsView = 3;

    @ValueMapValue
    private String labelTextColor;

    @PostConstruct
    protected void init() {
        super.init();
    }

    public String getProductInformationFile() {
        return (i18n == null ? "Product Information" : i18n.get("product.information.label"));
    }

    public String getTitle() {
        return title;
    }

    public String getHeading() {
        return heading;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public String getDescription() {
        return description;
    }

    public String getShowLabel() {
        return showLabel;
    }

    public String getHideLabel() {
        return hideLabel;
    }

    public String getCtaTopLabel() {
        return ctaTopLabel;
    }

    public String getCtaTopLink() {
        return AemUtils.getLinkWithExtension(ctaTopLink, request);
    }

    public String getCtaBottomLabel() {
        return ctaBottomLabel;
    }

    public String getCtaBottomLink() {
        return AemUtils.getLinkWithExtension(ctaBottomLink, request);
    }

    public String getCtaDownloadLabel() {
        return ctaDownloadLabel;
    }

    public String getCtaCloseLabel() {
        return ctaCloseLabel;
    }

    public String getBackgroundColor() { return backgroundColor; }

    public String getTextAlignment() {
        return textAlignment;
    }

    public int getColumnsView() {
        return columnsView;
    }

    public String getLabelTextColor() {
        return labelTextColor;
    }

    public String getProductInformationButtonLabel() {
        return (i18n == null ? "Product Information" : i18n.get("product.information.label"));
    }

    @Override
    public List<OfferFragmentBean> getOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != phases) {
            for (Resource offer : phases.getChildren()) {
                String cfPath = AemUtils.getStringProperty(offer, "cfPath");
                String allowanceType = AemUtils.getStringProperty(offer, "allowanceType");
                Resource cfResource = resourceResolver.getResource(cfPath);

                String cfPlanPath = AemUtils.getStringProperty(offer, "cfPlanPath");
                Resource cfPlanResource = resourceResolver.getResource(cfPlanPath);
                OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(cfResource, i18n);
                if (offerFragmentBean == null) {
                    continue;
                }
                offerFragmentBean.setAllowanceType(allowanceType);
                PlanInfo planInfo = CFUtils.populatePlans(cfPlanResource);
                if (planInfo != null) {
                    offerFragmentBean.setPlanInfo(planInfo);
                }
                offers.add(offerFragmentBean);
            }
        }
        return offers;
    }
    public String getViewCartLabel() {
        return (i18n == null ? "View Cart" : i18n.get("lebara.viewcart.label"));
    }
    public String getAddedtoCartLabel() {
        return (i18n == null ? "Addon {0} added to cart" : i18n.get("lebara.addon.addedtocart.label"));
    }
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
