package com.lebara.core.servlet;

import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HelpCenterSearchServletTest {

    @InjectMocks
    HelpCenterSearchServlet helpCenterSearchServlet = new HelpCenterSearchServlet();

    @InjectMocks
    GlobalSearchServlet globalSearchServlet  = new GlobalSearchServlet();

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    SearchResult searchResult;

    @Mock
    Query query;

    @Mock
    InheritanceValueMap inheritanceValueMap;

    public AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/orderdetails";


    @BeforeEach
    void setUp() {
        context.load().json("/page.json","/content");
    }

    @Test
    void doGet() throws ServletException, IOException, NoSuchFieldException {
        Map<String, Object> map = new HashMap<>();
        map.put("searchRoot","valu1");
        context.currentResource(PROPERTIES_JSON);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        request.setParameterMap(map);
        PrivateAccessor.setField(helpCenterSearchServlet, "builder", queryBuilder);
        lenient().when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
        lenient().when(query.getResult()).thenReturn(searchResult);
        helpCenterSearchServlet.doGet(request,response);
    }
}