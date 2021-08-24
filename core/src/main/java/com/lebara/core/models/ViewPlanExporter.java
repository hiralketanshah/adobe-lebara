package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.dto.PlanInfo;
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
    private String minutesField;

    @ValueMapValue
    private String unlimitedTextField;

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
        return ctaTopLink;
    }

    public String getCtaBottomLabel() {
        return ctaBottomLabel;
    }

    public String getCtaBottomLink() {
        return ctaBottomLink;
    }

    public List<OfferFragmentBean> getOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != phases) {
            for (Resource offer : phases.getChildren()) {
                String cfPath = AemUtils.getStringProperty(offer, "cfPath");
                Resource cfResource = resourceResolver.getResource(cfPath);

                String cfPlanPath = AemUtils.getStringProperty(offer, "cfPlanPath");
                Resource cfPlanResource = resourceResolver.getResource(cfPlanPath);
                populateOffer(offers, cfResource, cfPlanResource);
            }
        }
        return offers;
    }

    private void populateOffer(List<OfferFragmentBean> offers, Resource cfResource, Resource cfPlanResource) {
        if (null != cfResource) {
            ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != offerFragment) {
                OfferFragmentBean offerFragmentBean = new OfferFragmentBean();
                offerFragmentBean.setCost(offerFragment.getElement("cost").getContent());
                offerFragmentBean.setValidity(offerFragment.getElement("validity").getContent());
                offerFragmentBean.setAllowances(offerFragment.getElement("allowances").getContent());
                if (null != cfPlanResource) {
                    ContentFragment cfPlanFragment = cfPlanResource.adaptTo(ContentFragment.class);
                    if(null != cfPlanFragment){
                        PlanInfo planInfo = new PlanInfo();
                        planInfo.setTitle(cfPlanFragment.getElement("title").getContent());
                        planInfo.setCountryTitle(cfPlanFragment.getElement("countryTitle").getContent());
                        planInfo.setListPlanItem(new String[]{cfPlanFragment.getElement("listPlanItem").getContent()});
                        planInfo.setCountryList(new String[]{cfPlanFragment.getElement("countryList").getContent()});
                        offerFragmentBean.setPlanInfo(planInfo);
                    }
                }
                offers.add(offerFragmentBean);
            }
        }
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
