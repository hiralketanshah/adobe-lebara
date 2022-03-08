package com.lebara.core.servlet;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.net.MediaType;
import com.lebara.core.dto.PromotionFragmentBean;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.*;

@Component(service = {Servlet.class})
@SlingServletResourceTypes(
        resourceTypes = NameConstants.NT_PAGE,
        methods = HttpConstants.METHOD_GET,
        extensions = "json",
        selectors = "promotions")
public class PromotionsInfoServlet extends SlingSafeMethodsServlet {
    private transient Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Reference
    private transient QueryBuilder queryBuilder;

    private String promotionsRootPath;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        LOGGER.debug("request path {}", request.getPathInfo());
        ResourceResolver resourceResolver = request.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page page = null;
        Resource resource = request.getResource();
        List<PromotionFragmentBean> promotionFragmentBeanList = new ArrayList<>();
        if (pageManager != null) {
            page = pageManager.getContainingPage(resource);
        }
        if (page != null) {
            InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            promotionsRootPath = inheritedProp.getInherited("promotionsRootPath", String.class);
        }
        if (StringUtils.isBlank(promotionsRootPath)) {
            LOGGER.debug("please author the root path for promotions");
            return;
        }
        getPromotionFragmentPath(resourceResolver).forEach(path -> {
                    PromotionFragmentBean promotionFragmentBean = CFUtils.populatePromotions(resourceResolver, path);
                    promotionFragmentBeanList.add(promotionFragmentBean);
                }
        );
        ObjectMapper mapper = new ObjectMapper();
        String prettyPrintedJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(promotionFragmentBeanList);
        response.setContentType(MediaType.JSON_UTF_8.toString());
        response.getWriter().println(prettyPrintedJson);
    }

    private List<String> getPromotionFragmentPath(ResourceResolver resourceResolver) {
        Query query = queryBuilder.createQuery(PredicateGroup.create(getPredicatesMap()), resourceResolver.adaptTo(Session.class));
        SearchResult searchResult = query.getResult();
        List<Hit> hitList = searchResult.getHits();
        List<String> promotionFragmentsPath = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(hitList)) {
            hitList.forEach(hit -> {
                try {
                    promotionFragmentsPath.add(hitList.get(hitList.indexOf(hit)).getPath());
                } catch (RepositoryException e) {
                    LOGGER.error("Error in results", e);
                }
            });
        }
        return promotionFragmentsPath;
    }

    private Map<String, String> getPredicatesMap() {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", promotionsRootPath);
        predicate.put("p.limit", "-1");
        predicate.put("type", DamConstants.NT_DAM_ASSET);
        predicate.put("property", "jcr:content/data/cq:model");
        predicate.put("property.value", "/conf/lebara/settings/dam/cfm/models/promotion-plan-fragment");
        return predicate;
    }
}