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
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {AddOnExporter.class, ComponentExporter.class},
        resourceType = AddOnExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AddOnExporter extends EmptyCartExporter  {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/addon";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ChildResource
    protected Resource intlPlans;

    @ChildResource
    protected Resource flexiPlans;

    @ValueMapValue
    private String intlCallsTabLabel;

    @ValueMapValue
    private String flexiCallsTabLabel;

    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
    }

    @JsonProperty("expandableIntlPlanProps")
    public List<OfferFragmentBean> getIntlPlanOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != intlPlans) {
            offers = CFUtils.getCfList(intlPlans, resourceResolver, i18n);
        }
        return offers;
    }

    @JsonProperty("expandableFlexiPlanProps")
    public List<OfferFragmentBean> getFlexiPlanOffers() {
        List<OfferFragmentBean> offers = new ArrayList<>();
        if (null != flexiPlans) {
            offers = CFUtils.getCfList(flexiPlans, resourceResolver, i18n);
        }
        return offers;
    }
    
    public String getIntlCallsTabLabel() {
        return intlCallsTabLabel;
    }

    public String getFlexiCallsTabLabel() {
        return flexiCallsTabLabel;
    }
    
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
