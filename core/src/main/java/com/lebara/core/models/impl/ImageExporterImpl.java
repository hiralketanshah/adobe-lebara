package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.adobe.cq.wcm.core.components.models.Breadcrumb;
import com.adobe.cq.wcm.core.components.models.Image;
import com.lebara.core.models.beans.ListItem;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { Image.class,
		ComponentExporter.class }, resourceType = ImageExporterImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ImageExporterImpl implements Image {

	@Inject
	@Source("script-bindings")
	private Style currentStyle;

	@SlingObject
	private ResourceResolver resourceResolver;

	@Self
	@Via(type = ResourceSuperType.class)
	private Image delegate;

	@ValueMapValue
	private String id;

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/image";

	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getSrc() {
		return AemUtils.getImageRendition(delegate.getFileReference(), currentStyle.get("rendition", String.class),
				resourceResolver);
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

	@Override
	public boolean displayPopupTitle() {
		return delegate.displayPopupTitle();
	}

	@Override
	public String getAlt() {
		return delegate.getAlt();
	}

	@Override
	public String getTitle() {
		return delegate.getTitle();
	}

	@Override
	public String getLink() {
		return delegate.getLink();
	}

	@Override
	public boolean isDecorative() {
		return delegate.isDecorative();
	}

	@Override
	public String getJson() {
		return delegate.getJson();
	}

	@Override
	public String getSrcUriTemplate() {
		return delegate.getSrcUriTemplate();
	}

	@Override
	public boolean isLazyEnabled() {
		return delegate.isLazyEnabled();
	}

	public boolean isDmImage() {
		return delegate.isDmImage();
	}

	public String getSmartCropRendition() {
		return delegate.getSmartCropRendition();
	}

	@Override
	public int getLazyThreshold() {
		return delegate.getLazyThreshold();
	}

	@Override
	public String getUuid() {
		return delegate.getUuid();
	}
}
