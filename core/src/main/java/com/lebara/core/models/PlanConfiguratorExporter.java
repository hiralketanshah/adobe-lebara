package com.lebara.core.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.style.ComponentStyleInfo;
import com.lebara.core.models.beans.MapperBean;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PlanConfiguratorExporter.class,
        ComponentExporter.class }, resourceType = PlanConfiguratorExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlanConfiguratorExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/nl/planconfigurator";

    @SlingObject
    Resource resource;
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
    private String nationalUnlimitedPlanText;
    @ValueMapValue
    private String nationalUnlimitedPlanTextSummary;
    @ValueMapValue
    private String speedLabel;
    @ValueMapValue
    private String basicSpeedTitle;
    @ValueMapValue
    private String advancedSpeedTitle;
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
    private String internationalUnlimitedPlanText;
    @ValueMapValue
    private String internationalUnlimitedPlanDescription;
    @ValueMapValue
    private String internationalUnlimitedPlanTextSummary;
    @ValueMapValue
    private boolean isRetentionConfigurator;
    @ChildResource
    private List<MapperBean> retentionMapping;
    @ValueMapValue
    private String verificationPageRedirect;

    private String appliedStyles;

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

    public String getNationalUnlimitedPlanText() {
        return nationalUnlimitedPlanText;
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

    public String getInternationalUnlimitedPlanText() {
        return internationalUnlimitedPlanText;
    }

    public String getInternationalUnlimitedPlanDescription() {
        return AemUtils.updateShortenLinksInRichText(internationalUnlimitedPlanDescription, slingRequest);
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }

    public String getBasicSpeedTitle() {
        return basicSpeedTitle;
    }

    public String getAdvancedSpeedTitle() {
        return advancedSpeedTitle;
    }

    public String getNationalUnlimitedPlanTextSummary() {
        return nationalUnlimitedPlanTextSummary;
    }

    public String getInternationalUnlimitedPlanTextSummary() {
        return internationalUnlimitedPlanTextSummary;
    }

    public boolean getIsRetentionConfigurator() {
        return isRetentionConfigurator;
    }

    public Map<String, String> getRetentionMapping() {
        Map<String, String> retentionMap = new HashMap<String, String>();
        if (null != retentionMapping && !retentionMapping.isEmpty()) {
            retentionMap = retentionMapping.stream().collect(Collectors.toMap(p -> p.getKey(), p -> p.getValue()));
        }
        return retentionMap;
    }

    public String getVerificationPageRedirect() {
        return AemUtils.getLinkWithExtension(verificationPageRedirect);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}