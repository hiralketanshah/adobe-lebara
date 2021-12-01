package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.lebara.core.models.beans.SelectOption;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.lang3.StringUtils;
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
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {InternationalRatesExporter.class, ComponentExporter.class},
        resourceType = InternationalRatesExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class InternationalRatesExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/internationalrates";


    @SlingObject
    private ResourceResolver resourceResolver;

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String cfPath;


    @ValueMapValue
    private String description;

    private String fragmentRootPath;

    private I18n i18n;

    private String landlineCallRate;
    private String mobileCallRate;
    private String smsRate;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page page = null;
        if (pageManager != null) {
            page = pageManager.getContainingPage(resource);
        }
        if (page != null) {
            InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            fragmentRootPath = inheritedProp.getInherited("internationalRatesRootPath", String.class);
        }
        Resource cfResource = resourceResolver.getResource(cfPath);
        if (cfResource != null) {
            ContentFragment irFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != irFragment) {
                landlineCallRate = CFUtils.getElementValue(irFragment, "landlineCallRate");
                mobileCallRate = CFUtils.getElementValue(irFragment, "mobileCallRate");
                smsRate = CFUtils.getElementValue(irFragment, "smsRate");
            }
        }
    }


    public String getDescription() {
        return description;
    }

    public String getLandlineCallRate() {
        return landlineCallRate;
    }

    public String getMobileCallRate() {
        return mobileCallRate;
    }

    public String getSmsRate() {
        return smsRate;
    }

    public List<SelectOption> getCountryList() {
        return CFUtils.getInternationalRates(resourceResolver, fragmentRootPath);
    }

    public String getLandlineLabel() {
        return i18n == null ? "Landline" : i18n.get("landline");
    }

    public String getMobileLabel() {
        return i18n == null ? "Mobile" : i18n.get("mobile");
    }

    public String getSMSLabel() {
        return i18n == null ? "SMS" : i18n.get("sms");
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
