package com.lebara.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

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
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {RecommendPlanExporter.class, ComponentExporter.class},
        resourceType = RecommendPlanExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RecommendPlanExporter extends ViewPlanExporter {

    private static final String CF_PATH = "cfPath";

	private static final String RECOMMEND_LINK_PROPERTY = "recommendLink";

	private static final String RECOMMEND_IMAGE_PROPERTY = "recommendImage";

	/**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/plans/recommendplans";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ChildResource
    protected Resource phases;

    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    public List<OfferFragmentBean> getOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != phases) {
            for (Resource offer : phases.getChildren()) {
                Resource cfResource = resourceResolver.getResource(AemUtils.getStringProperty(offer, CF_PATH));
                OfferFragmentBean offerFragmentBean= CFUtils.populateOffers(cfResource, i18n);
                offerFragmentBean.setRecommendImage(AemUtils.getStringProperty(offer, RECOMMEND_IMAGE_PROPERTY));
                offerFragmentBean.setRecommendLink(AemUtils.getStringProperty(offer, RECOMMEND_LINK_PROPERTY));
                offers.add(offerFragmentBean);
            }
        }
        return offers;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
