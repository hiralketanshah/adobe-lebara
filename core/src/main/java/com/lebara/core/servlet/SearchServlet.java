package com.lebara.core.servlet;


import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.lebara.core.dto.SearchInfo;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component(service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Simple Demo Servlet",
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.paths=" + "/bin/lebara/search",
                "sling.servlet.extensions=" + "sample",
        })
public class SearchServlet extends SlingSafeMethodsServlet {
    @Reference
    private QueryBuilder builder;

    private Session session;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String param = request.getParameter("q");
        ResourceResolver resourceResolver = request.getResourceResolver();
        session = resourceResolver.adaptTo(Session.class);

        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", "/content/lebara/de/en");
        predicate.put("type", "cq:Page");
        predicate.put("fulltext", param);
        predicate.put("p.limit", "-1");
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
                e.printStackTrace();
            }
        }
        response.getWriter().println(json.toJson(searchInfoList));
    }
}
