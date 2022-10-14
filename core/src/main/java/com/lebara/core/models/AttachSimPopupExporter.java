package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.models.beans.ActivateSimBean;
import com.lebara.core.models.beans.AttachSimBean;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = SlingHttpServletRequest.class, adapters = {AttachSimPopupExporter.class, ComponentExporter.class},
        resourceType = AttachSimPopupExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AttachSimPopupExporter implements ComponentExporter{

    protected static final String RESOURCE_TYPE = "lebara/components/dashboard/attachsimpopup";

    @ChildResource
    private AttachSimBean attachSimModal;
    
    @ValueMapValue
    private boolean showUpdatedModal;

    @ChildResource
    private ActivateSimBean activateSimModal;

    @JsonProperty("attachSimModal")
    public AttachSimBean getAttachSimModal() {
        return attachSimModal;
    }

    @JsonProperty("activateSimModal")
    public ActivateSimBean getActivateSimModal() {
        return activateSimModal;
    }
    
    public boolean getShowUpdatedModal() {
 		return showUpdatedModal;
 	}

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
