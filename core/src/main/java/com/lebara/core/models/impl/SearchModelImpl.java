package com.lebara.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Search;
import com.lebara.core.models.SearchModel;
import com.lebara.core.models.beans.Link;
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

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { SearchModelImpl.class,
		ComponentExporter.class }, resourceType = SearchModelImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SearchModelImpl implements SearchModel {

	@ValueMapValue
	private String searchPlaceholder;

	@ValueMapValue
	private String mostSearchLabel;

	@ValueMapValue
	private String emptySearchResultMsg;

	@ChildResource
	private List<Link> links;

	@ScriptVariable
	protected Resource resource;

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/search";

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
		return links == null ? Collections.emptyList() : Collections.unmodifiableList(links);
	}

	public String getEmptySearchResultMsg() {
		return emptySearchResultMsg;
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

}
