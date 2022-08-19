package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.designer.Style;
import com.lebara.core.dto.SelectBean;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {WhereToCallExporter.class, ComponentExporter.class},
        resourceType = WhereToCallExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class WhereToCallExporter implements ComponentExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "lebara/components/wheretocall";

    @SlingObject
    private ResourceResolver resourceResolver;
    
    @ScriptVariable
    private Style currentStyle;

    @ScriptVariable
    private Resource resource;

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String placeholder;

    @ValueMapValue
    private String fragmentRootPath;

    private List<SelectBean> countryList;

	public String getFileReference() {
		return AemUtils.getImageRendition(fileReference, currentStyle.get("rendition", String.class), resourceResolver);
	}

    public String getTitle() {
        return title;
    }

	public List<SelectBean> getCountries() {
		if (StringUtils.isNotBlank(fragmentRootPath)) {
			countryList = CFUtils.getWhereToCallRates(resourceResolver, fragmentRootPath);
		}
		return (countryList == null) ? Collections.emptyList() : Collections.unmodifiableList(countryList);
	}

    public String getPlaceholder() {
        return placeholder;
    }    

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
