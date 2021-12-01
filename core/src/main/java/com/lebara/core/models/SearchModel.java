package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Search;
import com.lebara.core.models.beans.Link;

import java.util.List;

public interface SearchModel extends Search {

	public String getSearchPlaceholder();

	public String getMostSearchLabel();

	public List<Link> getLinks();

}
