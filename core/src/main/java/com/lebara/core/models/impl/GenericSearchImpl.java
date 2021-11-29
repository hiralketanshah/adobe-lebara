package com.lebara.core.models.impl;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Search;
import com.lebara.core.models.GenericSearch;
import com.lebara.core.models.Link;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { GenericSearchImpl.class,
		ComponentExporter.class }, resourceType = GenericSearchImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GenericSearchImpl implements GenericSearch {

	@ValueMapValue
	private String searchPlaceholder;

	@ValueMapValue
	private String mostSearchLabel;

	@ChildResource
	private List<Link> links;

	@ScriptVariable
	protected Resource resource;

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/genericsearch";

	@Self
	@Via(type = ResourceSuperType.class)
	private Search delegate;

	@Override
	public String getSearchRootPagePath() {
		return delegate.getSearchRootPagePath();
	}

	public String getSearchPlaceholder() {
		return searchPlaceholder;
	}

	public String getMostSearchLabel() {
		return mostSearchLabel;
	}

	public List<Link> getLinks() {
		return links;
	}

	@Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
