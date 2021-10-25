package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.i18n.I18n;
import com.lebara.core.dto.CFAllowance;
import com.lebara.core.dto.OfferFragmentBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.ListUtils;
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
import java.util.*;

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
    private String popupCloseLabel;
    @ValueMapValue
    private String orderNowLabel;
    @ValueMapValue
    private String orderNowUrl;
    @ValueMapValue
    private String durationLabel;
    @ValueMapValue
    private String contractPeriodPopupHeading;
    @ValueMapValue
    private String contractPeriodPopupInfo;
    @ValueMapValue
    private String dataVolumeLabel;
    @ValueMapValue
    private String dataVolumePopupHeading;
    @ValueMapValue
    private String dataVolumePopupInfo;
    @ValueMapValue
    private String abroadMinutesLabel;
    @ValueMapValue
    private String abroadMinutesPopupHeading;
    @ValueMapValue
    private String abroadMinutesPopupInfoTop;
    @ValueMapValue
    private String countryFlagFrom;
    @ValueMapValue
    private String countryFlagTo;
    @ValueMapValue
    private String abroadMinutesPopupInfoBottom;
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
    @ValueMapValue
    private String yourOrderOneTimeActivationFee;

    Map<String, String> duration = new HashMap<>();
    Map<String, String> internationalMinutes = new HashMap<>();
    Map<String, String> data = new HashMap<>();
    Map<String, String> postpaidPlans = new HashMap<>();
    private I18n i18n;

    @PostConstruct
    private void init() {
        i18n = AemUtils.geti18n(resourceResolver, resource, slingRequest);
        Resource postpaidRootPath = resourceResolver.getResource(rootpath);
        if (postpaidRootPath != null && StringUtils.equalsIgnoreCase(postpaidRootPath.getName(), "postpaid")) {
            for (Resource postpaidPlan : postpaidRootPath.getChildren()) {
                OfferFragmentBean offerFragmentBean = CFUtils.populateOffers(postpaidPlan, i18n);
                String key = offerFragmentBean.getValidity();
                String value = offerFragmentBean.getId();
                duration.put(offerFragmentBean.getValidity(), offerFragmentBean.getValidityText());
                List<CFAllowance> allowanceList = offerFragmentBean.getAllowanceList();
                if (CollectionUtils.isEmpty(allowanceList)) {
                    continue;
                }
                for (CFAllowance allowance : allowanceList) {
                    if (allowance == null) {
                        continue;
                    }
                    if (StringUtils.endsWithIgnoreCase(allowance.getName(), "Postpaid_Data")) {
                        data.put(allowance.getFormatedValue(), offerFragmentBean.getDataVolumeText());
                        key += "-" + allowance.getFormatedValue();
                    } else if (StringUtils.endsWithIgnoreCase(allowance.getName(), "Postpaid_Intl_Mins")) {
                        internationalMinutes.put(allowance.getFormatedValue(), offerFragmentBean.getMinutesToCountriesText());
                        key += "-" + allowance.getFormatedValue();
                    }
                }
                key += "-" + offerFragmentBean.getCost();
                postpaidPlans.put(key, value);
            }
        }
    }

    public Map<String, String> getDuration() {
        return duration;
    }

    public String getPopupCloseLabel() {
        return popupCloseLabel;
    }

    public Map<String, String> getData() {
        return data;
    }

    public Map<String, String> getInternationalMinutes() {
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

    public String getContractPeriodPopupHeading() {
        return contractPeriodPopupHeading;
    }

    public String getContractPeriodPopupInfo() {
        return contractPeriodPopupInfo;
    }

    public String getDataVolumeLabel() {
        return dataVolumeLabel;
    }

    public String getDataVolumePopupHeading() {
        return dataVolumePopupHeading;
    }

    public String getDataVolumePopupInfo() {
        return dataVolumePopupInfo;
    }

    public String getAbroadMinutesLabel() {
        return abroadMinutesLabel;
    }

    public String getAbroadMinutesPopupHeading() {
        return abroadMinutesPopupHeading;
    }

    public String getAbroadMinutesPopupInfoTop() {
        return abroadMinutesPopupInfoTop;
    }

    public String getCountryFlagFrom() {
        return countryFlagFrom;
    }

    public String getCountryFlagTo() {
        return countryFlagTo;
    }

    public String getAbroadMinutesPopupInfoBottom() {
        return abroadMinutesPopupInfoBottom;
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

    public String getYourOrderOneTimeActivationFee() {
        return yourOrderOneTimeActivationFee;
    }

    public Map<String, String> getPostpaidPlans() {
        return postpaidPlans;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
