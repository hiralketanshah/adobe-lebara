package com.lebara.core.models;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.models.beans.IconTextBean;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {IconTextListExporter.class, ComponentExporter.class},
resourceType = IconTextListExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class IconTextListExporter implements ComponentExporter {

	/**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/icontextlist";
    
    @ChildResource
    private List<IconTextBean> listData;

	public List<IconTextBean> getListData() {
		return listData;
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
    
}
