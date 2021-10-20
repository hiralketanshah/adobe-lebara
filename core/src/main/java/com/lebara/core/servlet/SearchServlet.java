package com.lebara.core.servlet;


import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.lebara.core.dto.SearchInfo;
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
                SLING_SERVLET_METHODS+"="+HttpConstants.METHOD_GET,
                SLING_SERVLET_RESOURCE_TYPES + "=lebara/components/search",
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

        String pathInfo = request.getRequestPathInfo().getResourcePath();
        Resource searchResource = request.getResourceResolver().getResource(pathInfo);
        if(null != searchResource && null != searchResource.getValueMap().get("searchRoot")){
            String searchRoot = searchResource.getValueMap().get("searchRoot").toString();
            if(StringUtils.isEmpty(searchRoot)){
                searchRoot = "/content/lebara/";
            }
            Map<String, String> predicate = new HashMap<>();
            predicate.put("path", searchRoot);
            predicate.put("type", "cq:Page");
            if(null != searchType && searchType.equalsIgnoreCase("fulltext")){
                predicate.put("fulltext", param);
            } else {
                predicate.put("1_property", "jcr:content/cq:tags");
                predicate.put("1_property.value", "%"+param+"%");
                predicate.put("1_property.operation", "like");
            }
           // predicate.put("p.limit", "-1");
            Gson json = new Gson();
            Query query = builder.createQuery(PredicateGroup.create(predicate), session);
            SearchResult searchResult = query.getResult();
            List<SearchInfo> searchInfoList = new ArrayList<>();
            for(Hit hit : searchResult.getHits()) {
                try {
                    SearchInfo searchInfo = new SearchInfo();
                    searchInfo.setPath(hit.getPath());
                    searchInfo.setTitle(hit.getTitle());
                    searchInfoList.add(searchInfo);
                } catch (RepositoryException e) {
                    LOGGER.error("Error in the Search",e);
                }
            }
            response.getWriter().println(json.toJson(searchInfoList));
        }
    }
}
