package com.lebara.core.models;

import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.lebara.core.dto.*;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PostPaidPlansExporter.class,
        ComponentExporter.class }, resourceType = PostPaidPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostPaidPlansExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/postpaidPlans";

    @SlingObject
    private ResourceResolver resourceResolver;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String durationTitle;

    @ChildResource
    private Resource duration;

    @ValueMapValue
    private String bundleTitle;

    @ValueMapValue
    private String bundleDescription;

    @ChildResource
    private Resource bundle;

    @ValueMapValue
    private String callingTexting;

    @ChildResource
    private Resource calling;

    @ValueMapValue
    private String speedTitle;

    @ChildResource
    private Resource cfPathSpeedPlan;

    @ValueMapValue
    private String extraOptionsTitle;

    @ValueMapValue
    private String extraOptionsDescription;

    @ChildResource
    private Resource cfPathExtra;

    @ValueMapValue
    private String grandTotalTitle;

    @ValueMapValue
    private String activationTitle;

    @ValueMapValue
    private String totalTitle;

    @ValueMapValue
    private String subscriptionTitle;

    /// plan details another cf
    @ValueMapValue
    private String cfPathOtherDetails;

    @ValueMapValue
    private String orderNowTitle;

    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    public List<PlanInfo> getPlanDetail() {
        List<PlanInfo> plans = new ArrayList<>();
        if (StringUtils.isNotBlank(cfPathOtherDetails)) {
            PlanInfo planInfo = CFUtils.populatePlans(resourceResolver.getResource(cfPathOtherDetails));
            if (planInfo != null) {
                plans.add(planInfo);
            }
        }

        return plans;
    }

    public List<Duration> getDurationDetails() {
        List<Duration> durationList = new ArrayList<>();
        if (null != duration) {
            for (Resource durationResource : duration.getChildren()) {
                Duration durationDetails = durationResource.adaptTo(Duration.class);
                durationList.add(durationDetails);
            }
        }
        return durationList;
    }

    public List<OfferFragmentBean> getCallingAndTexting() {
        return CFUtils.getCfList(calling,resourceResolver, i18n);
    }

    public List<OfferFragmentBean> getExtraOption() {
        return CFUtils.getCfList(cfPathExtra,resourceResolver, i18n);
    }

    public List<OfferFragmentBean> getSpeeds() {
        return CFUtils.getCfList(cfPathSpeedPlan,resourceResolver, i18n);
    }

    public List<OfferFragmentBean> getBundles() {
        return CFUtils.getCfList(bundle,resourceResolver, i18n);
    }

    @Override
    public String getExportedType() {

        return resource.getResourceType();
    }

    public String getDurationTitle() {
        return durationTitle;
    }

    public String getBundleTitle() {
        return bundleTitle;
    }

    public String getBundleDescription() {
        return bundleDescription;
    }

    public String getCallingTexting() {
        return callingTexting;
    }

    public String getSpeedTitle() {
        return speedTitle;
    }

    public String getExtraOptionsTitle() {
        return extraOptionsTitle;
    }

    public String getExtraOptionsDescription() {
        return extraOptionsDescription;
    }

    public String getGrandTotalTitle() {
        return grandTotalTitle;
    }

    public String getActivationTitle() {
        return activationTitle;
    }

    public String getTotalTitle() {
        return totalTitle;
    }

    public String getSubscriptionTitle() {
        return subscriptionTitle;
    }

    public String getOrderNowTitle() {
        return orderNowTitle;
    }
}
