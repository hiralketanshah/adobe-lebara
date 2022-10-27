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

@Model(adaptables = SlingHttpServletRequest.class, adapters = { DashboardBannerExporter.class,
		ComponentExporter.class }, resourceType = DashboardBannerExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DashboardBannerExporter implements ComponentExporter {

	protected static final String RESOURCE_TYPE = "lebara/components/dashboardbanner";

	@ScriptVariable
	protected Resource resource;

	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue
    private String fileReferenceMobile;

	@ValueMapValue
	private String imageAlt;

	@ValueMapValue
	private String onClickRedirectUrl;

	public String getImage() {
		return fileReference;
	}
	
	public String getMobileImage() {
        return fileReferenceMobile;
    }

	public String getImageAlt() {
		return imageAlt;
	}

	public String getOnClickRedirectUrl() {
		return AemUtils.getLinkWithExtension(onClickRedirectUrl);
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}
