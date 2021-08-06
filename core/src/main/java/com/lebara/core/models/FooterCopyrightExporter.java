package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.dto.Cta;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {FooterCopyrightExporter.class, ComponentExporter.class},
        resourceType = FooterCopyrightExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FooterCopyrightExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/footer/footercopyright";

    @ScriptVariable
    private Resource resource;

    @ChildResource
    private Resource copyrightInfo;

    @ValueMapValue
    private String copyrightText;

    private List<Cta> copyrightFooterInfo;

    public List<Cta> getCopyrightInfo() {
        copyrightFooterInfo = new ArrayList<>();
        for (Resource copyrightRes : copyrightInfo.getChildren()) {
            String label = AemUtils.getStringProperty(copyrightRes, "label");
            String link = AemUtils.getStringProperty(copyrightRes, "labelLink");
            Cta cta = new Cta(label, link);
            copyrightFooterInfo.add(cta);
        }
        return copyrightFooterInfo;
    }

    public String getCopyrightText() {
        return copyrightText;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
