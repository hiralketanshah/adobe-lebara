package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;

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

    @ChildResource
    private Resource phases;

    @ValueMapValue
    private String buttonLabel;

    @ValueMapValue
    private String preTitle;

    @ValueMapValue
    private String minutesField;

    @ValueMapValue
    private String unlimitedTextField;

    public String getButtonLabel() {
        return buttonLabel;
    }

    public String getPreTitle() {
        return preTitle;
    }

    public String getMinutesField() {
        return minutesField;
    }

    public String getUnlimitedTextField() {
        return unlimitedTextField;
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
        return resource.getResourceType();
    }
}
