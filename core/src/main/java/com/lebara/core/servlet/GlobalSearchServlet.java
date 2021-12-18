package com.lebara.core.servlet;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.google.gson.Gson;
import com.lebara.core.dto.SearchInfo;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.apache.sling.api.servlets.ServletResolverConstants.*;

@Component(
        service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Global Search Servlet",
                SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
                SLING_SERVLET_RESOURCE_TYPES + "=cq:Page",
                SLING_SERVLET_SELECTORS + "=" + "globalsearch",
                SLING_SERVLET_EXTENSIONS + "=json",
        }
)
public class GlobalSearchServlet extends SlingSafeMethodsServlet {

    @Reference
    private transient QueryBuilder builder;

    transient Logger LOGGER = LoggerFactory.getLogger(getClass());

    public static final String DEFAULT_SEARCH_ROOT = "/content/lebara";

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String param = request.getParameter("q");
        String searchType = request.getParameter("searchType");
        ResourceResolver resourceResolver = request.getResourceResolver();
        Session session = resourceResolver.adaptTo(Session.class);
        String searchRoot = request.getParameter("searchRoot");
        if (StringUtils.isEmpty(searchRoot)) {
            searchRoot = DEFAULT_SEARCH_ROOT;
        }
        LOGGER.debug("searchRoot is {}", searchRoot);
        Map<String, String> predicate = getGlobalSearchPredicates(param, searchType, searchRoot);
        response.getWriter().println(getSearchInfoString(predicate, builder, session, request));
    }


    /**
     * Full text or tag based search
     * 
     * @param param
     * @param searchType
     * @param searchRoot
     * @return
     */
    protected Map<String, String> getGlobalSearchPredicates(String param, String searchType, String searchRoot) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", searchRoot);
        predicate.put("type", NameConstants.NT_PAGE);
        if (null != searchType && searchType.equalsIgnoreCase("fulltext")) {
            predicate.put("fulltext", param);
        } else if (null != searchType && searchType.equalsIgnoreCase("tag")){
            predicate.put("1_property", "jcr:content/cq:tags");
            predicate.put("1_property.value", "%" + param + "%");
            predicate.put("1_property.operation", "like");
        } else {
            addTitleSearchPredicate(param, predicate);
        }
        return predicate;
    }
    
    /**
     * Title based search
     * 
     * @param param
     * @param searchRoot
     * @return
     */
    protected Map<String, String> getGlobalSearchPredicates(String param, String searchRoot) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", searchRoot);
        predicate.put("type", NameConstants.NT_PAGE);
        addTitleSearchPredicate(param, predicate);
        return predicate;
    }

    /**
     * @param param
     * @param predicate
     */
    private void addTitleSearchPredicate(String param, Map<String, String> predicate) {
        predicate.put("1_group.p.or", "true");

        predicate.put("1_group.1_property", "jcr:content/jcr:title");
        predicate.put("1_group.1_property.value", "%" + param + "%");
        predicate.put("1_group.1_property.operation", "like");

        predicate.put("1_group.2_property", "jcr:content/pageTitle");
        predicate.put("1_group.2_property.value", "%" + param + "%");
        predicate.put("1_group.2_property.operation", "like");

        predicate.put("1_group.3_property", "jcr:content/navTitle");
        predicate.put("1_group.3_property.value", "%" + param + "%");
        predicate.put("1_group.3_property.operation", "like");
    }
    
    /**
     * @param predicate
     * @param builder
     * @param session
     * @return
     */
    protected String getSearchInfoString(Map<String, String> predicate, QueryBuilder builder, Session session, SlingHttpServletRequest request) {
        Query query = builder.createQuery(PredicateGroup.create(predicate), session);
        SearchResult searchResult = query.getResult();
        List<SearchInfo> searchInfoList = new ArrayList<>();
        for (Hit hit : searchResult.getHits()) {
            try {
                SearchInfo searchInfo = new SearchInfo();
                searchInfo.setPath(AemUtils.getLinkWithExtension(hit.getPath(), request));
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
