package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.dto.OfferFragmentBean;
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
import java.util.HashSet;
import java.util.Set;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PostpaidExporter.class, ComponentExporter.class},
        resourceType = PostpaidExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostpaidExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/postpaid";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String rootpath;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;

    Set<String> duration = new HashSet<>();
    Set<String> minutes = new HashSet<>();



    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
        Resource postpaidRootPath = resourceResolver.getResource(rootpath);
        if (postpaidRootPath != null) {
            for (Resource postpaidPlan : postpaidRootPath.getChildren()) {
                OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(postpaidPlan, i18n);
                duration.add(offerFragmentBean.getValidity());
            }
        }
    }

    public Set<String> getDuration() {
        return duration;
    }

    public Set<String> getMinutes() {
        return minutes;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
