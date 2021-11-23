package com.lebara.core.utils;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.google.gson.Gson;
import com.lebara.core.dto.SearchInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SearchUtils {
    public static final Logger LOGGER = LoggerFactory.getLogger(SearchUtils.class);

    public static final String DEFAULT_SEARCH_ROOT = "/content/lebara";

    public static String getSearchInfoString(Map<String, String> predicate, QueryBuilder builder, Session session) {
        Query query = builder.createQuery(PredicateGroup.create(predicate), session);
        SearchResult searchResult = query.getResult();
        List<SearchInfo> searchInfoList = new ArrayList<>();
        for (Hit hit : searchResult.getHits()) {
            try {
                SearchInfo searchInfo = new SearchInfo();
                searchInfo.setPath(hit.getPath());
                searchInfo.setTitle(hit.getTitle());
                searchInfoList.add(searchInfo);
            } catch (RepositoryException e) {
                LOGGER.error("Error in the Search", e);
            }
        }
        Gson json = new Gson();
        return json.toJson(searchInfoList);
    }
}
