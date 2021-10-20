package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.CFAllowance;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
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

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String rootpath;
    @ValueMapValue
    private String moreDetailsLabel;
    @ValueMapValue
    private String orderNowLabel;
    @ValueMapValue
    private String orderNowUrl;
    @ValueMapValue
    private String durationLabel;
    @ValueMapValue
    private String dataVolumeLabel;
    @ValueMapValue
    private String abroadMinutesLabel;
    @ValueMapValue
    private String yourOrderLabel;
    @ValueMapValue
    private String productInformationLabel;
    @ValueMapValue
    private String yourOrderContractdurationLabel;
    @ValueMapValue
    private String yourOrderDataLabel;
    @ValueMapValue
    private String yourOrderInternationalMinLabel;
    @ValueMapValue
    private String yourOrderMinutesInGermany;
    @ValueMapValue
    private String yourOrderPerMonthOrderTotalLabel;
    @ValueMapValue
    private String yourOrderOneTimeActivationFeeLabel;


    Set<String> duration = new HashSet<>();
    Set<String> internationalMinutes = new HashSet<>();
    Set<String> data = new HashSet<>();


    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
        Resource postpaidRootPath = resourceResolver.getResource(rootpath);
        if (postpaidRootPath != null && StringUtils.equalsIgnoreCase(postpaidRootPath.getName(), "postpaid")) {
            for (Resource postpaidPlan : postpaidRootPath.getChildren()) {
                OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(postpaidPlan, i18n);
                duration.add(offerFragmentBean.getValidity());
                for (CFAllowance allowance : offerFragmentBean.getAllowanceList()) {
                    if (StringUtils.equalsIgnoreCase(allowance.getName(), "DE_Postpaid_Data")) {
                        data.add(allowance.getFormatedValue());
                    }
                    if (StringUtils.equalsIgnoreCase(allowance.getName(), "DE_Postpaid_Intl_Mins")) {
                        internationalMinutes.add(allowance.getFormatedValue());
                    }
                }
            }
        }
    }

    public Set<String> getDuration() {
        return duration;
    }

    public Set<String> getData() {
        return data;
    }

    public Set<String> getInternationalMinutes() {
        return internationalMinutes;
    }

    public String getMoreDetailsLabel() {
        return moreDetailsLabel;
    }

    public String getOrderNowLabel() {
        return orderNowLabel;
    }

    public String getOrderNowUrl() {
        return orderNowUrl;
    }

    public String getDurationLabel() {
        return durationLabel;
    }

    public String getDataVolumeLabel() {
        return dataVolumeLabel;
    }

    public String getAbroadMinutesLabel() {
        return abroadMinutesLabel;
    }

    public String getYourOrderLabel() {
        return yourOrderLabel;
    }

    public String getProductInformationLabel() {
        return productInformationLabel;
    }

    public String getYourOrderContractdurationLabel() {
        return yourOrderContractdurationLabel;
    }

    public String getYourOrderDataLabel() {
        return yourOrderDataLabel;
    }

    public String getYourOrderInternationalMinLabel() {
        return yourOrderInternationalMinLabel;
    }

    public String getYourOrderMinutesInGermany() {
        return yourOrderMinutesInGermany;
    }

    public String getYourOrderPerMonthOrderTotalLabel() {
        return yourOrderPerMonthOrderTotalLabel;
    }

    public String getYourOrderOneTimeActivationFeeLabel() {
        return yourOrderOneTimeActivationFeeLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
