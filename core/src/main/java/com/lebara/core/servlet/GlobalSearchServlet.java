package com.lebara.core.servlet;

import com.day.cq.search.QueryBuilder;
import com.lebara.core.utils.SearchUtils;
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

import javax.jcr.Session;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
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
    private QueryBuilder builder;

    private ResourceResolver resourceResolver;

    private Session session;
    final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String param = request.getParameter("q");
        String searchType = request.getParameter("searchType");
        resourceResolver = request.getResourceResolver();
        session = resourceResolver.adaptTo(Session.class);
        String searchRoot = request.getParameter("searchRoot");
        if (StringUtils.isEmpty(searchRoot)) {
            searchRoot = SearchUtils.DEFAULT_SEARCH_ROOT;
        }
        LOGGER.debug("searchRoot is {}", searchRoot);
        Map<String, String> predicate = getGlobalSearchPredicates(param, searchType, searchRoot);
        response.getWriter().println(SearchUtils.getSearchInfoString(predicate, builder, session));
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

}
