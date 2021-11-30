package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { SectionIntroExporter.class,
		ComponentExporter.class }, resourceType = SectionIntroExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SectionIntroExporter extends IntroExporter {

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/sectionintro";

	@SlingObject
	private SlingHttpServletRequest slingRequest;

	@ScriptVariable
	private Resource resource;

	@ValueMapValue
	private String sectionHeading;

	@ValueMapValue
	private String sectionSubHeading;

	@ValueMapValue
	private String linkLabel;

	@ValueMapValue
	private String linkPath;

	@ValueMapValue
	private boolean noPadding;

	public String getSectionHeading() {
		return sectionHeading;
	}

	public String getSectionSubHeading() {
		return sectionSubHeading;
	}

	public String getLinkLabel() {
		return linkLabel;
	}

	public String getLinkPath() {
		return AemUtils.getLinkWithExtension(linkPath, slingRequest);
	}

	public boolean isNoPadding() {
		return noPadding;
	}

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}
}
