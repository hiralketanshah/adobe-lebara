package com.lebara.core.servlet;


import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.google.gson.Gson;
import com.lebara.core.dto.SearchInfo;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
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
                SLING_SERVLET_RESOURCE_TYPES + "=cq:Page" ,
                SLING_SERVLET_SELECTORS + "=" + "helpcentersearch",
                SLING_SERVLET_SELECTORS + "=" + "globalsearch",
                SLING_SERVLET_EXTENSIONS + "=json",
        }
)
public class SearchServlet extends SlingSafeMethodsServlet {
    @Reference
    private QueryBuilder builder;

    private Session session;
    final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String param = request.getParameter("q");
        String searchType = request.getParameter("searchType");
        ResourceResolver resourceResolver = request.getResourceResolver();
        session = resourceResolver.adaptTo(Session.class);
        String[] selectors = request.getRequestPathInfo().getSelectors();
        String pathInfo = request.getRequestPathInfo().getResourcePath();
        String resourceType = request.getResource().getResourceType();
        Resource searchResource = request.getResourceResolver().getResource(pathInfo);
        String searchRoot = AemUtils.getStringProperty(searchResource, "searchRoot");
        if (StringUtils.isEmpty(searchRoot)) {
            searchRoot = "/content/lebara/";
        }
        Map<String, String> predicate = new HashMap<>();
        List<SearchInfo> searchInfoList = new ArrayList<>();
        if (ArrayUtils.contains(selectors,"helpcentersearch")) {
            predicate = getHelpCenterSearchPredicates(param, searchType, searchRoot);
        } else if (ArrayUtils.contains(selectors,"globalsearch")) {
            predicate = getGlobalSearchPredicates(param, searchType, searchRoot);
        }
        Query query = builder.createQuery(PredicateGroup.create(predicate), session);
        SearchResult searchResult = query.getResult();
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
        response.getWriter().println(json.toJson(searchInfoList));

    }


    private Map<String, String> getGlobalSearchPredicates(String param, String searchType, String searchRoot) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", searchRoot);
        predicate.put("type", "cq:Page");
        if (null != searchType && searchType.equalsIgnoreCase("fulltext")) {
            predicate.put("fulltext", param);
        } else {
            predicate.put("1_property", "jcr:content/cq:tags");
            predicate.put("1_property.value", "%" + param + "%");
            predicate.put("1_property.operation", "like");
        }
        return predicate;
    }

    private Map<String, String> getHelpCenterSearchPredicates(String param, String searchType, String searchRoot) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", searchRoot);
        predicate.put("type", "cq:Page");
        predicate.put("p.limit", "20");
        predicate.put("1_property", "jcr:content/jcr:title");
        predicate.put("1_property.value", "%" + param + "%");
        predicate.put("1_property.operation", "like");
        return predicate;
    }

}
