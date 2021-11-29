package com.lebara.core.servlet;

import com.day.cq.search.QueryBuilder;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Map;

import static org.apache.sling.api.servlets.ServletResolverConstants.*;

@Component(
        service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Help Center Search Servlet",
                SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
                SLING_SERVLET_RESOURCE_TYPES + "=cq:Page",
                SLING_SERVLET_SELECTORS + "=" + "helpcentersearch",
                SLING_SERVLET_EXTENSIONS + "=json",
        }
)
public class HelpCenterSearchServlet extends GlobalSearchServlet {
	
    @Reference
    private transient QueryBuilder builder;
   
    final transient Logger log = LoggerFactory.getLogger(getClass());

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        String param = request.getParameter("q");
        ResourceResolver resourceResolver = request.getResourceResolver();
        Session session = resourceResolver.adaptTo(Session.class);
        String searchRoot = request.getParameter("searchRoot");
        if (StringUtils.isEmpty(searchRoot)) {
            searchRoot = DEFAULT_SEARCH_ROOT;
        }
        log.debug("searchRoot is {}", searchRoot);
        Map<String, String> predicate = getGlobalSearchPredicates(param, null, searchRoot);
        response.getWriter().println(getSearchInfoString(predicate, builder, session));
    }
}
