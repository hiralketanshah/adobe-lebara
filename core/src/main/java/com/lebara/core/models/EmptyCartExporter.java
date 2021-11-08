package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.dto.PlanInfo;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {EmptyCartExporter.class, ComponentExporter.class},
        resourceType = EmptyCartExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmptyCartExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/emptycart";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ChildResource
    protected Resource addOns;

    @ChildResource
    protected Resource dataPlans;

    @ChildResource
    protected Resource plans;

    @ValueMapValue
    private String cartDescription;

    @ValueMapValue
    private String goBackText;

    @ValueMapValue
    private String emptyBasketText;

    @ValueMapValue
    private String shopBuyLabel;
    @ValueMapValue
    private String addOnTabLabel;
    @ValueMapValue
    private String dataTabLabel;
    @ValueMapValue
    private String plansTabLabel;
    @ValueMapValue
    private String showDetailsLabel;
    @ValueMapValue
    private String buyPlanLabel;
    @ValueMapValue
    private String addToCartLabel;
    @ValueMapValue
    private String continueBrowsingLabel;
    @ValueMapValue
    private String continueBrowsinglink;

    @ValueMapValue
    private boolean isFullWidth = false;
    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    @JsonProperty("expandableAddOnsCardProps")
    public List<OfferFragmentBean> getAddOnOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != addOns) {
            offers = CFUtils.getCfList(addOns, resourceResolver, i18n);
        }
        return offers;
    }

    @JsonProperty("expandableSimPlanCardProps")
    public List<OfferFragmentBean> getDataOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != dataPlans) {
            offers = CFUtils.getCfList(dataPlans, resourceResolver, i18n);
        }
        return offers;
    }

    @JsonProperty("expandablePlanCardProps")
    public List<OfferFragmentBean> getPlanOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != plans) {
            offers = CFUtils.getCfList(plans, resourceResolver, i18n);
        }
        return offers;
    }

    public String getCartDescription() {
        return cartDescription;
    }

    public String getShopBuyLabel() {
        return shopBuyLabel;
    }

    public String getAddOnTabLabel() {
        return addOnTabLabel;
    }

    public String getDataTabLabel() {
        return dataTabLabel;
    }

    public String getPlansTabLabel() {
        return plansTabLabel;
    }

    public String getShowDetailsLabel() {
        return showDetailsLabel;
    }

    public String getBuyPlanLabel() {
        return buyPlanLabel;
    }

    public String getAddToCartLabel() {
        return addToCartLabel;
    }

    public String getContinueBrowsingLabel() {
        return continueBrowsingLabel;
    }

    public String getGoBackText() {
        return goBackText;
    }

    public String getEmptyBasketText() {
        return emptyBasketText;
    }

    public String getContinueBrowsinglink() {
        return continueBrowsinglink;
    }

    public boolean isFullWidth() {
        return isFullWidth;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
