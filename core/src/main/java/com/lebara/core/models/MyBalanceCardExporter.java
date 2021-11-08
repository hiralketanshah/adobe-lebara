package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.CFUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {MyBalanceCardExporter.class, ComponentExporter.class},
        resourceType = MyBalanceCardExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class MyBalanceCardExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/mybalancecard";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String topupLabel;

    @ValueMapValue
    private String autoTopupLabel;

    @ValueMapValue
    private String activeLabel;

    @ValueMapValue
    private String activeDesc;

    @ValueMapValue
    private String editLabel;

    @ValueMapValue
    private String topupSelectLabel;

    @ValueMapValue
    private String limitSelectLabel;

    @ValueMapValue
    private String autoTopupStatusLabel;

    @ValueMapValue
    private String autoTopupButtonLabel;

    @ValueMapValue
    private String cfTopupPlanPath;

    public List<String> getTopUpOptions() {
        return CFUtils.populateTopupInfo(resourceResolver.getResource(cfTopupPlanPath));
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getTopupLabel() {
        return topupLabel;
    }

    public String getAutoTopupLabel() {
        return autoTopupLabel;
    }

    public String getActiveLabel() {
        return activeLabel;
    }

    public String getActiveDesc() {
        return activeDesc;
    }

    public String getEditLabel() {
        return editLabel;
    }

    public String getTopupSelectLabel() {
        return topupSelectLabel;
    }

    public String getLimitSelectLabel() {
        return limitSelectLabel;
    }

    public String getAutoTopupStatusLabel() {
        return autoTopupStatusLabel;
    }

    public String getAutoTopupButtonLabel() {
        return autoTopupButtonLabel;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
