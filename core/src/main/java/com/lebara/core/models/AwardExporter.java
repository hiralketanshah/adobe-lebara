package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.designer.Style;
import com.lebara.core.models.beans.ImageIcon;
import com.lebara.core.models.beans.ImageProperties;
import com.lebara.core.utils.AemUtils;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {AwardExporter.class, ComponentExporter.class},
        resourceType = AwardExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AwardExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/awards";
    
    @SlingObject
    private ResourceResolver resourceResolver;
    
    @Inject @Source("script-bindings")
	private Style currentStyle;

    @ScriptVariable
    private Resource resource;
    @ValueMapValue
    private String title;
    @ChildResource
    private List<ImageIcon> awards;

    public String getTitle() {
        return title;
    }

	public List<ImageIcon> getAwards() {
		if (null == awards) {
			return Collections.emptyList();
		}
		for (ImageIcon image : awards) {
			String rendition = AemUtils.getImageRendition(image.getImage(), currentStyle.get("rendition", String.class),
					resourceResolver);
			image.setImage(rendition);
		}
		return Collections.unmodifiableList(awards);
	}

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
