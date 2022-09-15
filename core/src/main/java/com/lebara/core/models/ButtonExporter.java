package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Button;
import com.lebara.core.utils.AemUtils;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { Button.class,
		ComponentExporter.class }, resourceType = ButtonExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ButtonExporter implements Button{
	
	protected static final String RESOURCE_TYPE = "lebara/components/button";
	
	@SlingObject
	private SlingHttpServletRequest request;
	
	@ScriptVariable
	protected Resource resource;
	
	@Self
	@Via(type = ResourceSuperType.class)
	private Button delegate;
	
	@ValueMapValue
	private boolean openInNewTab;
	
	@ValueMapValue
	private String buttonStyle;

	/*
	 * @ValueMapValue private boolean colorsEnabled;
	 */
	
	@ValueMapValue
	private String buttonBackgroundColor;

	@ValueMapValue
	private String buttonHoverBgColor;
	
	@Override
	public String getText() {
		return delegate.getText();
	}
	
	@Override
	public String getLink() {
		return AemUtils.getLinkWithExtension(delegate.getLink(), request);
	}

	public boolean getOpenInNewTab() {
		return openInNewTab;
	}

	public String getButtonStyle() {
		return buttonStyle;
	}

	public String getButtonBackgroundColor() {
		return buttonBackgroundColor;
	}

	public String getButtonHoverBgColor() {
		return buttonHoverBgColor;
	}
	
	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}
	
	
}
