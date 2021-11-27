package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.DashboardLabels;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {PrepaidPlansExporter.class, ComponentExporter.class},
        resourceType = PrepaidPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PrepaidPlansExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/prepaidplans";

    @SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String manageLabel;

    @ValueMapValue
    private String ctaDashboardManageURL;

    private DashboardLabels dashboardLabels;

    @PostConstruct
    private void init(){
        dashboardLabels = AemUtils.populateDashboardLabels(request);
    }

    public String getManageLabel() {
        return manageLabel;
    }

    public String getLeftOfText() {
        return dashboardLabels.getLeftOfLabel();
    }

    public List<String> getPlansTabNames() {
        List<String> plansTabNames = new ArrayList<>();
        plansTabNames.add(dashboardLabels.getDataPlanName());
        plansTabNames.add(dashboardLabels.getMinPlanName());
        plansTabNames.add(dashboardLabels.getSmsPlanName());
        plansTabNames.add(dashboardLabels.getInternationalMinPlanName());
        return plansTabNames;
    }

    public String getCtaDashboardManageURL() {
        return AemUtils.getLinkWithExtension(ctaDashboardManageURL, request);
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
