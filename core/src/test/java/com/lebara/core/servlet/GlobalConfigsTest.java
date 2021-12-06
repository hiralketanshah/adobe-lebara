package com.lebara.core.servlet;

import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.lebara.core.services.GlobalOsgiService;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GlobalConfigsTest {

    @InjectMocks
    GlobalConfigs globalConfigs = new GlobalConfigs();

    @Mock
    GlobalOsgiService globalOsgiService;

    @Mock
    InheritanceValueMap inheritanceValueMap;

    public AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
    private static final String PROPERTIES_JSON = "/content/video/jcr:content/root/responsivegrid/orderdetails";


    @BeforeEach
    void setUp() {
        context.load().json("/page.json","/content");
    }

    @Test
    void doGet() throws ServletException, IOException {
        Map<String, Object> map = new HashMap<>();
        map.put("offerId",new String[]{"valu1", "valu2", "valu3", "valu4", "valu5"});
        context.currentResource(PROPERTIES_JSON);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        lenient().when(globalOsgiService.getApiHostUri()).thenReturn("apiURI");
        lenient().when(globalOsgiService.getGqlEndpoint()).thenReturn("endPoint");
        lenient().when(globalOsgiService.getPaymentClientKey()).thenReturn("payemntKey");
        lenient().when(globalOsgiService.getPaymentAdeyenEnv()).thenReturn("getPaymentAdeyenEnv");
        lenient().when(inheritanceValueMap.getInherited("currencyName", String.class)).thenReturn("rupee");
        globalConfigs.doGet(request,response);
    }
}