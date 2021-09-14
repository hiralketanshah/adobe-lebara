package com.lebara.core.services;

import com.adobe.cq.dam.cfm.*;
import com.google.gson.Gson;
import com.lebara.core.dto.Offer;
import com.lebara.core.dto.RootRead;
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

import static org.mockito.ArgumentMatchers.anyString;

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

    @BeforeEach
    public void setup() throws Exception {
        json = IOUtils.toString(this.getClass().getResourceAsStream("/epcResponseDate.json"), "UTF-8");

    }

    @Test
    public void testGetJsonFromEPC() {
        assert (json != null);
    }

    @Test
    public void testcreateContentFragment() {
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        crudOperationEpc.createContentFragment(json, "", resourceResolver);
    }

    @Test
    public void testcreateContentFragment2() throws ContentFragmentException {
        RootRead convertedEpcJsonObject = new Gson().fromJson(json, RootRead.class);
        List<Offer> offers = convertedEpcJsonObject.getData().getOffers();
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        Mockito.when(resource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
        if (!offers.isEmpty()) {
            Offer offer = offers.get(0);
            Mockito.when(fragmentTemplate.createFragment(resource,  offer.name, offer.name)).thenReturn(newFragment);
            Mockito.when(newFragment.getElement(anyString())).thenReturn(contentElement);
            Mockito.when(contentElement.getValue()).thenReturn(fragmentData);
            assert (offer.offerId == crudOperationEpc.writeJsonToCf(offers.get(0), "", resourceResolver,""));
        }
    }

    //this code comes handy to get json response from api-aggregator quickly.
    //@Test
    public void testConnection() {
        String json = crudOperationEpc.getJsonFromEPC("https://dev-api-aggregator.lebara.com/api-aggregator/", "GB","getCurrentOffers");
        assert (json != StringUtils.EMPTY);
    }

}
