package com.lebara.core.models.impl;

import com.lebara.core.models.beans.Link;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collections;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchModelImpl {

	@ValueMapValue
	private String searchRoot;

	@ValueMapValue
	private String searchPlaceholder;

	@ValueMapValue
	private String mostSearchLabel;

	@ValueMapValue
	private String emptySearchResultMsg;

	@ChildResource
	private List<Link> links;
	

	public String getSearchRoot() {
		return searchRoot;
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
}
