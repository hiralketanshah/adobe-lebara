package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { StickyCircle.class,
		ComponentExporter.class }, resourceType = StickyCircle.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StickyCircle implements ComponentExporter {
	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/dashboard/stickycircle";

	@ScriptVariable
	private Resource resource;

	@SlingObject
	private SlingHttpServletRequest request;

	@ValueMapValue
	private String linkLabel;

	@ValueMapValue
	private String linkPath;

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

	public String getLinkLabel() {
		return linkLabel;
	}

	public String getLinkPath() {
		return AemUtils.getLinkWithExtension(linkPath, request);
	}
}