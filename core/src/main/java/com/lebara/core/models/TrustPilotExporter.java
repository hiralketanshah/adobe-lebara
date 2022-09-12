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

@Model(adaptables = SlingHttpServletRequest.class, adapters = { TrustPilotExporter.class,
        ComponentExporter.class }, resourceType = TrustPilotExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TrustPilotExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/trustpilot";

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private int desktopReviewCount;

    @ValueMapValue
    private int mobileReviewCount;

    @ValueMapValue
    private String trustPilotBarLink;

    public String getTitle() {
        return title;
    }

    public int getDesktopReviewCount() {
        return desktopReviewCount;
    }

    public int getMobileReviewCount() {
        return mobileReviewCount;
    }

    public String getTrustPilotBarLink() {
        return AemUtils.getLinkWithExtension(trustPilotBarLink, slingRequest);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
