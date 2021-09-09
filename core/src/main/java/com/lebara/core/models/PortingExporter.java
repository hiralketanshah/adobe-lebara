package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PortingExporter.class,
		ComponentExporter.class }, resourceType = PortingExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PortingExporter implements ComponentExporter {

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/porting";

	@ScriptVariable
	private Resource resource;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String ctaOneLable;

	@ValueMapValue
	private String ctaOneLink;

	@ValueMapValue
	private String ctaTwoLable;

	@ValueMapValue
	private String ctaTwoLink;

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

	public String getDescription() {
		return description;
	}

	public String getCtaOneLable() {
		return ctaOneLable;
	}

	public String getCtaOneLink() {
		return AemUtils.getLinkWithExtension(ctaOneLink);
	}

	public String getCtaTwoLable() {
		return ctaTwoLable;
	}

	public String getCtaTwoLink() {
		return AemUtils.getLinkWithExtension(ctaTwoLink);
	}

}
