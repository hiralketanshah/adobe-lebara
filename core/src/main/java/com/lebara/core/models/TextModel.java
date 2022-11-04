package com.lebara.core.models;

import com.lebara.core.utils.AemUtils;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Text;
import com.adobe.cq.wcm.style.ComponentStyleInfo;

import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { TextModel.class, ComponentExporter.class }, resourceType = {
    TextModel.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextModel implements Text {

    protected static final String RESOURCE_TYPE = "lebara/components/text";
    
    @SlingObject
    Resource resource;

    @Self
    @Via(type = ResourceSuperType.class)
    private Text delegate;

    @ValueMapValue
    private String textalignment;

    @ValueMapValue
    private boolean isNewDesign;

    @SlingObject
    private SlingHttpServletRequest slingRequest;
    
    private String appliedStyles;

    @Override
    public String getText() {
        return AemUtils.updateShortenLinksInRichText(delegate.getText(),slingRequest);
    }

    public String getTextalignment() {
        return textalignment;
    }

	public boolean getIsNewDesign() {
        return isNewDesign;
    }

    @Override
    public boolean isRichText() {
        return delegate.isRichText();
    }

    public String getAppliedStyles() {
        return Optional.of(resource).map(resource -> resource.adaptTo(ComponentStyleInfo.class))
                .map(cmpStyleInfo -> cmpStyleInfo.getAppliedCssClasses()).orElse("");
    }
    
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
