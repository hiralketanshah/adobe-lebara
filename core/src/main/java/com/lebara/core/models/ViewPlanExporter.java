package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {ViewPlanExporter.class, ComponentExporter.class},
        resourceType = ViewPlanExporter.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ViewPlanExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/viewplans";

    @Self
    private SlingHttpServletRequest request;

    private Resource currentResource;

    @Optional
    @ChildResource
    private Resource phases;

    private ResourceResolver resourceResolver;

    @PostConstruct
    protected void init() {
        currentResource = request.getResource();
        resourceResolver = request.getResourceResolver();
    }

    public String getButtonLabel() {
        return AemUtils.getStringProperty(currentResource, "buttonlabel");
    }

    public String getPretitle() {
        return AemUtils.getStringProperty(currentResource, "pretitle");
    }

    public String getMinutesfield() {
        return AemUtils.getStringProperty(currentResource, "minutesfield");
    }

    public String getUnlimitedtextfield() {
        return AemUtils.getStringProperty(currentResource, "unlimitedtextfield");
    }

    public List<OfferFragmentBean> getOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != phases) {
            for (Resource offer : phases.getChildren()) {
                String cfPath = AemUtils.getStringProperty(offer, "cfPath");
                Resource cfResource = resourceResolver.getResource(cfPath);
                populateOffer(offers, cfResource);
            }
        }
        return offers;
    }

    private void populateOffer(List<OfferFragmentBean> offers, Resource cfResource) {
        if (null != cfResource) {
            ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != offerFragment) {
                OfferFragmentBean offerFragmentBean = new OfferFragmentBean();
                offerFragmentBean.setCost(offerFragment.getElement("cost").getContent());
                offerFragmentBean.setValidity(offerFragment.getElement("validity").getContent());
                offerFragmentBean.setAllowances(offerFragment.getElement("allowances").getContent());
                offers.add(offerFragmentBean);
            }
        }
    }

    @Override
    public String getExportedType() {
        return currentResource.getResourceType();
    }
}
