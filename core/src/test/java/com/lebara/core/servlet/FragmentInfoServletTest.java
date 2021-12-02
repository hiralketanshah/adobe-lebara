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
import java.lang.annotation.Inherited;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FragmentInfoServletTest {

    @InjectMocks
    FragmentInfoServlet fragmentInfoServlet = new FragmentInfoServlet();

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
//    Whitebox.setInternalState(mainClassObject, "builder", builder);

    @Test
    void doGet() throws ServletException, IOException, NoSuchFieldException {
        Map<String, Object> map = new HashMap<>();
        final List<Hit> results = new ArrayList<>();
        final List<String> result1 = new ArrayList<>();
        Hit pageResult1 = mock(Hit.class);
        Hit pageResult2 = mock(Hit.class);
        Hit pageResult3 = mock(Hit.class);
        map.put("offerId",new String[]{"valu1", "valu2", "valu3", "valu4", "valu5"});
        context.currentResource(PROPERTIES_JSON);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        request.setParameterMap(map);
        Mockito.when(inheritanceValueMap.getInherited("offerRootPath", String.class)).thenReturn("/content/lebara");
        //Map<String, String> predicatesMap = new HashMap<>();
        PredicateGroup predicateGroup = PredicateGroup.create(getPredicatesMap(result1));
        PrivateAccessor.setField(fragmentInfoServlet, "queryBuilder", queryBuilder);
        lenient().when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
        lenient().when(query.getResult()).thenReturn(searchResult);
        results.add(pageResult3);
        results.add(pageResult1);
        results.add(pageResult2);
        when(searchResult.getHits()).thenReturn(results);

        when(searchResult.getTotalMatches()).thenReturn(3L);
        fragmentInfoServlet.doGet(request,response);
    }

    private Map<String, String> getPredicatesMap(List<String> offerIdList) {
        Map<String, String> predicate = new HashMap<>();
        predicate.put("path", "/content/lebara");
        predicate.put("type", "dam:Asset");
        predicate.put("property", "jcr:content/data/master/offerid");
        offerIdList.forEach(
            id -> predicate.put("property.{0}_value".replace("{0}", String.valueOf(offerIdList.indexOf(id))), id));
        return predicate;
    }
}