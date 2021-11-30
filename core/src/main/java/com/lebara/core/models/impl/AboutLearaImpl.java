package com.lebara.core.models.impl;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.adobe.cq.wcm.core.components.models.Teaser;
import com.lebara.core.models.AboutLebara;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { AboutLebara.class,
		ComponentExporter.class }, resourceType = AboutLearaImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AboutLearaImpl  implements AboutLebara {

	@ValueMapValue
	private String backgroundColor;

	@ScriptVariable
	protected Resource resource;

	@ValueMapValue
	private String fileReference;

	@ValueMapValue
	private String buttonStyle;

	@ValueMapValue
	private String imageAlign;

	@ValueMapValue
	private String buttonBackgroundColor;

	@ValueMapValue
	private String buttonHoverBgColor;

	@ValueMapValue
	private boolean colorsEnabled;

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/aboutlebara";

	@Self
	@Via(type = ResourceSuperType.class)
	private Teaser delegate;

	@Override
	public String getBackgroundColor() {
		return backgroundColor;
	}

	public String getButtonStyle() {
		return buttonStyle;
	}

	@Override
	public List<ListItem> getActions() {
		return delegate.getActions();
	}

	@Override
	public String getDescription() {
		return delegate.getDescription();
	}

	@Override
	public String getLinkURL() {
		return delegate.getLinkURL();
	}

	@Override
	public String getPretitle() {
		return delegate.getPretitle();
	}

	@Override
	public String getTitle() {
		return delegate.getTitle();
	}

	@Override
	public String getTitleType() {
		return delegate.getTitleType();
	}

	@Override
	public boolean isActionsEnabled() {
		return delegate.isActionsEnabled();
	}

	@Override
	public boolean isImageLinkHidden() {
		return delegate.isImageLinkHidden();
	}

	@Override
	public boolean isTitleLinkHidden() {
		return delegate.isTitleLinkHidden();
	}

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

	public String getImageAlign() {
		return imageAlign;
	}

	public String getButtonBackgroundColor() {
		return colorsEnabled ? buttonBackgroundColor : null;
	}

	public String getButtonHoverBgColor() {
		return colorsEnabled ? buttonHoverBgColor : null;
	}

	@Override
	public String getImagePath() {
		return fileReference;
	}

}
