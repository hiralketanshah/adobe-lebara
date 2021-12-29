package com.lebara.core.services;

import com.adobe.cq.dam.cfm.*;
import com.google.gson.Gson;
import com.lebara.core.dto.Offer;
import com.lebara.core.dto.RootRead;
import com.lebara.core.dto.topup.Root;
import com.lebara.core.utils.LebaraConstants;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.apache.sling.api.resource.Resource;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;

@ExtendWith({MockitoExtension.class})
public class CrudOperationEpcTest {
    @InjectMocks
    private CrudOperationEpc crudOperationEpc = new CrudOperationEpc();

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private Resource resource;

    @Mock
    private FragmentTemplate fragmentTemplate;

    @Mock
    private ContentFragment newFragment;

    @Mock
    private ContentElement contentElement;

    @Mock
    private FragmentData fragmentData;

    static String json;
    static String jsonTopUp;

    @BeforeEach
    public void setup() throws Exception {
        json = IOUtils.toString(this.getClass().getResourceAsStream("/epcResponseDate.json"), "UTF-8");
        jsonTopUp = IOUtils.toString(this.getClass().getResourceAsStream("/epc_topup.json"), "UTF-8");
    }

    @Test
    public void testGetJsonFromEPC() {
        assert (json != null);
    }

    @Test
    public void testcreateContentFragment() {
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        Mockito.when(resource.adaptTo(ContentFragment.class)).thenReturn(newFragment);
        crudOperationEpc.createContentFragment(json, "", resourceResolver, "prepaid");
    }

    @Test
    public void testcreateContentFragment2() throws ContentFragmentException {
        Mockito.when(resourceResolver.getResource("/uk_plus_7_95")).thenReturn(null);
        Mockito.when(resourceResolver.getResource(LebaraConstants.CONTENT_FRAGMENT_MODEL_PATH)).thenReturn(resource);
        Mockito.when(resource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
        Mockito.when(fragmentTemplate.createFragment(any(),anyString(),anyString())).thenReturn(newFragment);
        Mockito.when(newFragment.getElement(anyString())).thenReturn(contentElement);
        crudOperationEpc.createContentFragment(json, "", resourceResolver, "prepaid");
    }

    @Test
    public void testcreateTopUpContentFragment() throws ContentFragmentException {
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        Mockito.when(resource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
        Mockito.when(fragmentTemplate.createFragment(any(),anyString(),anyString())).thenReturn(newFragment);
        Mockito.when(newFragment.getElement(anyString())).thenReturn(contentElement);
        Mockito.when(contentElement.getValue()).thenReturn(fragmentData);
        crudOperationEpc.createTopupContentFragment(jsonTopUp, "", resourceResolver, "topup");
    }

    //this code comes handy to get json response from api-aggregator quickly.
    @Test
    public void testConnection() {
        String json = crudOperationEpc.getJsonFromEPC("https://dev-api-aggregator.lebara.com/api-aggregator", "GB","getCurrentOffers");
        assert (json != StringUtils.EMPTY);
    }
}
