package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PlanConfiguratorExporter.class,
        ComponentExporter.class }, resourceType = PlanConfiguratorExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlanConfiguratorExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/planconfigurator";

    @SlingObject
    private SlingHttpServletRequest slingRequest;
    @ValueMapValue
    private String promotionalLabel;
    @ValueMapValue
    private String mostPopularLabel;
    @ValueMapValue
    private String mostPopularBundleId;
    @ValueMapValue
    private String infoPopupCloseLabel;
    @ValueMapValue
    private String extraOptionLabel;
    @ValueMapValue
    private String durationLabel;
    @ValueMapValue
    private String durationPopupHeading;
    @ValueMapValue
    private String durationPopupInfo;
    @ValueMapValue
    private String oneMonthTitle;
    @ValueMapValue
    private String oneMonthDescription;
    @ValueMapValue
    private String twentyFourMonthsTitle;
    @ValueMapValue
    private String twentyFourMonthsDescription;
    @ValueMapValue
    private String bundleLabel;
    @ValueMapValue
    private String bundlePopupHeading;
    @ValueMapValue
    private String bundlePopupInfo;
    @ValueMapValue
    private String callingAndtextingLabel;
    @ValueMapValue
    private String callingtextingPopupHeading;
    @ValueMapValue
    private String callingtextingPopupInfo;
    @ValueMapValue
    private String unlimitedMinsSmsText;
    @ValueMapValue
    private String speedLabel;
    @ValueMapValue
    private String speedPopupHeading;
    @ValueMapValue
    private String speedPopupInfo;
    @ValueMapValue
    private String internationalCallingLabel;
    @ValueMapValue
    private String internationalCallingPopupHeading;
    @ValueMapValue
    private String internationalCallingPopupInfo;
    @ValueMapValue
    private String unlimitedCallsSmsText;
    @ValueMapValue
    private String unlimitedCallsSmsDescription;

    public String getPromotionalLabel() {
        return promotionalLabel;
    }

    public String getMostPopularLabel() {
        return mostPopularLabel;
    }

    public String getMostPopularBundleId() {
        return mostPopularBundleId;
    }

    public String getInfoPopupCloseLabel() {
        return infoPopupCloseLabel;
    }

    public String getExtraOptionLabel() {
        return extraOptionLabel;
    }

    public String getDurationLabel() {
        return durationLabel;
    }

    public String getDurationPopupHeading() {
        return durationPopupHeading;
    }

    public String getDurationPopupInfo() {
        return AemUtils.updateShortenLinksInRichText(durationPopupInfo, slingRequest);
    }

    public String getOneMonthTitle() {
        return oneMonthTitle;
    }

    public String getOneMonthDescription() {
        return oneMonthDescription;
    }

    public String getTwentyFourMonthsTitle() {
        return twentyFourMonthsTitle;
    }

    public String getTwentyFourMonthsDescription() {
        return AemUtils.updateShortenLinksInRichText(twentyFourMonthsDescription, slingRequest);
    }

    public String getBundleLabel() {
        return bundleLabel;
    }

    public String getBundlePopupHeading() {
        return bundlePopupHeading;
    }

    public String getBundlePopupInfo() {
        return AemUtils.updateShortenLinksInRichText(bundlePopupInfo, slingRequest);
    }

    public String getCallingAndtextingLabel() {
        return callingAndtextingLabel;
    }

    public String getCallingtextingPopupHeading() {
        return callingtextingPopupHeading;
    }

    public String getCallingtextingPopupInfo() {
        return AemUtils.updateShortenLinksInRichText(callingtextingPopupInfo, slingRequest);
    }

    public String getUnlimitedMinsSmsText() {
        return unlimitedMinsSmsText;
    }

    public String getSpeedLabel() {
        return speedLabel;
    }

    public String getSpeedPopupHeading() {
        return speedPopupHeading;
    }

    public String getSpeedPopupInfo() {
        return AemUtils.updateShortenLinksInRichText(speedPopupInfo, slingRequest);
    }

    public String getInternationalCallingLabel() {
        return internationalCallingLabel;
    }

    public String getInternationalCallingPopupHeading() {
        return internationalCallingPopupHeading;
    }

    public String getInternationalCallingPopupInfo() {
        return AemUtils.updateShortenLinksInRichText(internationalCallingPopupInfo, slingRequest);
    }

    public String getUnlimitedCallsSmsText() {
        return unlimitedCallsSmsText;
    }

    public String getUnlimitedCallsSmsDescription() {
        return AemUtils.updateShortenLinksInRichText(unlimitedCallsSmsDescription, slingRequest);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}