package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Text;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.lebara.core.models.TextColorModel;
import com.lebara.core.utils.AemUtils;
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

@Model(adaptables = SlingHttpServletRequest.class, adapters = { TextColorModelImpl.class,
		ComponentExporter.class }, resourceType = TextColorModelImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextColorModelImpl implements TextColorModel {

	@ValueMapValue
	private String fontColor;

	@ScriptVariable
	protected Resource resource;

	@SlingObject
	private SlingHttpServletRequest slingRequest;

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/colortext";

	@Self
	@Via(type = ResourceSuperType.class)
	private Text delegate;

	@Override
	public String getId() {
		return delegate.getId();
	}

	@Override
	public ComponentData getData() {
		return delegate.getData();
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

	@Override
	public String getFontColor() {
		return fontColor;
	}

	@Override
	public String getText() {
		return AemUtils.updateShortenLinksInRichText(delegate.getText(),slingRequest);
	}

	@Override
	public boolean isRichText() {
		return delegate.isRichText();
	}
}
