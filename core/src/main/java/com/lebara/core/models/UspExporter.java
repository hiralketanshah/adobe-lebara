package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.designer.Style;
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

import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { UspExporter.class,
        ComponentExporter.class }, resourceType = UspExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class UspExporter extends HeadingExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/usp";
    
    @SlingObject
    private ResourceResolver resourceResolver;
    
    @Inject @Source("script-bindings")
    private Style currentStyle;

    @ValueMapValue
    private String boxBackgroundColor;

    @ScriptVariable
    private Resource resource;

    @ChildResource
    private List<ImageProperties> uspList;

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }

    public List<ImageProperties> getUspList() {
		if (null == uspList) {
			return Collections.emptyList();
		}
		for (ImageProperties image : uspList) {
			String rendition = AemUtils.getImageRendition(image.getIcon(), currentStyle.get("rendition", String.class),
					resourceResolver);
			image.setIcon(rendition);
		}

		return uspList;
    }

    public String getBoxBackgroundColor() {
        return boxBackgroundColor;
    }

}
