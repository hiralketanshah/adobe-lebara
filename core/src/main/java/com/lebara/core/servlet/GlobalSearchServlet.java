package com.lebara.core.servlet;

import com.day.cq.search.QueryBuilder;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.lebara.core.dto.SearchInfo;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

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
        ResourceResolver resourceResolver = request.getResourceResolver();
        String searchRoot = request.getParameter("searchRoot");
        if (StringUtils.isEmpty(searchRoot)) {
            searchRoot = DEFAULT_SEARCH_ROOT;
        }
        LOGGER.debug("searchRoot is {}", searchRoot);
        response.getWriter().println(getSearchInfoString(request, param, resourceResolver, searchRoot));
    }
   
    /**
     * @param request
     * @param param
     * @param resourceResolver
     * @param searchRoot
     * @return
     */
    protected String getSearchInfoString(SlingHttpServletRequest request, String param, ResourceResolver resourceResolver, String searchRoot) {
        List<SearchInfo> searchInfoList = new ArrayList<>();
        Session session = resourceResolver.adaptTo(Session.class);
        if (StringUtils.isNotBlank(param) && session != null) {
            String paramSearch = param.toLowerCase();
            final String QUERY_FIND_PAGES = "SELECT * FROM [cq:Page] AS searchResult WHERE ISDESCENDANTNODE(searchResult, [{0}])"
                    + " AND searchResult.[" + JcrConstants.JCR_CONTENT + "/"
                    + JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY + "] = \"{1}\""
                    + " AND (LOWER(searchResult.[" + JcrConstants.JCR_CONTENT + "/" + JcrConstants.JCR_TITLE
                    + "]) LIKE \"%{2}%\""
                    + " OR LOWER(searchResult.[" + JcrConstants.JCR_CONTENT + "/pageTitle]) LIKE \"%{3}%\""
                    + " OR LOWER(searchResult.[" + JcrConstants.JCR_CONTENT + "/navTitle]) LIKE \"%{4}%\")";
            final String sqlStatement = MessageFormat.format(QUERY_FIND_PAGES, searchRoot, "lebara/components/page",
                    paramSearch, paramSearch, paramSearch);
            final QueryManager queryManager;
            try {
                queryManager = session.getWorkspace().getQueryManager();
                final Query query = queryManager.createQuery(sqlStatement, Query.JCR_SQL2);
                query.setLimit(20);
                final QueryResult result = query.execute();
                final NodeIterator nodeIterator = result.getNodes();
                LOGGER.info("query triggered is {}", query.getStatement());
                while (nodeIterator.hasNext()) {
                    final Node node = nodeIterator.nextNode();
                    Resource hitResource = resourceResolver.getResource(node.getPath());
                    if (hitResource == null) {
                        continue;
                    }
                    Page page = hitResource.adaptTo(Page.class);
                    if (page == null) {
                        continue;
                    }
                    SearchInfo searchInfo = new SearchInfo();
                    searchInfo.setPath(AemUtils.getLinkWithExtension(page.getPath(), request));
                    searchInfo.setTitle(page.getTitle());
                    searchInfoList.add(searchInfo);

                }
            } catch (RepositoryException e) {
                LOGGER.error("error while triggering searc {}", e);
            }
        }
        Gson json = new Gson();
        return json.toJson(searchInfoList);
    }


}
