package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.Labels;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
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
    private SlingHttpServletRequest slingRequest;

    @ScriptVariable
    private Resource resource;
    @ValueMapValue
    private boolean showBoltOn;
    @ValueMapValue
    private String moreDetailsLabel;
    @ValueMapValue
    private String popupCloseLabel;
    @ValueMapValue
    private String orderNowLabel;
    @ValueMapValue
    private String switchCtaLabel;
    @ValueMapValue
    private String extraboltOnDescriptionLabel;
    @ValueMapValue
    private String yourOrderInternationalBoltOnLabel;
    @ValueMapValue
    private String boltOnLabel;
    @ValueMapValue
    private String boltOnRadioLabel;
    @ValueMapValue
    private String dataVolumeDescriptionLabel;
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
    @ChildResource
    private List<Labels> durationRadioLabelList;
    @ValueMapValue
    private String dataVolumeRadioLabel;
    @ValueMapValue
    private String abroadMinutesRadioLabel;
    @ValueMapValue
    private String yourOrdersimPlanLabel;
    @ValueMapValue
    private String yourOrderMinutesInGermanyValue;
    @ValueMapValue
    private String popupDownloadLabel;
    @ValueMapValue
    private String yourOrderMinutesLabel;
    @ValueMapValue
    private String yourOrderTwentyFourMonthsLabel;
    @ValueMapValue
    private String yourOrderOneMonthLabel;
    @ValueMapValue
    private String changePlanCancelLabel;
    @ValueMapValue
    private String changePlanConfirmLabel;
    @ValueMapValue
    private String changePlanCheckboxBottom;
    @ValueMapValue
    private String changePlanCheckboxTop;
    @ValueMapValue
    private String changePlanSubHeading;
    @ValueMapValue
    private String changePlanHeading;
    @ValueMapValue
    private String notMigratedToFmvnoErrorMessage;

    public boolean getShowBoltOn() {
        return showBoltOn;
    }

    public List<Labels> getDurationRadioLabelList() {
        return durationRadioLabelList == null ? Collections.emptyList() : Collections.unmodifiableList(durationRadioLabelList);
    }

    public String getDataVolumeRadioLabel() {
        return dataVolumeRadioLabel;
    }

    public String getAbroadMinutesRadioLabel() {
        return abroadMinutesRadioLabel;
    }

    public String getPopupCloseLabel() {
        return popupCloseLabel;
    }

    public String getMoreDetailsLabel() {
        return moreDetailsLabel;
    }

    public String getExtraboltOnDescriptionLabel() {
        return extraboltOnDescriptionLabel;
    }

    public String getBoltOnLabel() {
        return boltOnLabel;
    }

    public String getBoltOnRadioLabel() {
        return boltOnRadioLabel;
    }

    public String getDataVolumeDescriptionLabel() {
        return dataVolumeDescriptionLabel;
    }

    public String getOrderNowLabel() {
        return orderNowLabel;
    }

    public String getSwitchCtaLabel() {
        return switchCtaLabel;
    }

    public String getDurationLabel() {
        return durationLabel;
    }

    public String getContractPeriodPopupHeading() {
        return contractPeriodPopupHeading;
    }

    public String getContractPeriodPopupInfo() {
        return AemUtils.updateShortenLinksInRichText(contractPeriodPopupInfo,slingRequest);
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
        return AemUtils.updateShortenLinksInRichText(abroadMinutesPopupInfoTop,slingRequest);
    }

    public String getNotMigratedToFmvnoErrorMessage() {
        return notMigratedToFmvnoErrorMessage;
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

    public String getYourOrdersimPlanLabel() {
        return yourOrdersimPlanLabel;
    }

    public String getYourOrderMinutesInGermanyValue() {
        return yourOrderMinutesInGermanyValue;
    }

    public String getPopupDownloadLabel() {
        return popupDownloadLabel;
    }

    public String getYourOrderMinutesLabel() {
        return yourOrderMinutesLabel;
    }

    public String getYourOrderTwentyFourMonthsLabel() {
        return yourOrderTwentyFourMonthsLabel;
    }

    public String getYourOrderOneMonthLabel() {
        return yourOrderOneMonthLabel;
    }

    public String getChangePlanCancelLabel() {
        return changePlanCancelLabel;
    }

    public String getChangePlanConfirmLabel() {
        return changePlanConfirmLabel;
    }

    public String getChangePlanCheckboxBottom() {
        return AemUtils.updateShortenLinksInRichText(changePlanCheckboxBottom, slingRequest);
    }

    public String getYourOrderInternationalBoltOnLabel() {
        return yourOrderInternationalBoltOnLabel;
    }

    public String getChangePlanCheckboxTop() {
        return AemUtils.updateShortenLinksInRichText(changePlanCheckboxTop, slingRequest);
    }

    public String getChangePlanSubHeading() {
        return changePlanSubHeading;
    }

    public String getChangePlanHeading() {
        return changePlanHeading;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
