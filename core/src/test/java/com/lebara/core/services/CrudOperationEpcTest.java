package com.lebara.core.services;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.ContentFragmentException;
import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.google.gson.Gson;
import com.lebara.core.dto.Offer;
import com.lebara.core.dto.RootRead;
import com.lebara.core.utils.LebaraConstants;
import io.wcm.testing.mock.aem.junit5.AemContext;
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

import static org.mockito.ArgumentMatchers.any;
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

    static String json;

    @BeforeEach
    public void setup() throws Exception {
        json = crudOperationEpc.getJsonFromEPC("https://sit-omni.lebara.com/sit/epc-configuration/", "4cbbb29f41e346bbb52a02c6bafaffef", "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=");
    }

    @Test
    public void testGetJsonFromEPC() {
        assert (json != null);
    }

    @Test
    public void testcreateContentFragment(){
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        crudOperationEpc.createContentFragment(json, "", resourceResolver);
    }

    @Test
    public void testcreateContentFragment2() throws ContentFragmentException {
        RootRead convertedEpcJsonObject = new Gson().fromJson(json, RootRead.class);
        List<Offer> offers = convertedEpcJsonObject.getData().getOffers();
        Mockito.when(resourceResolver.getResource(anyString())).thenReturn(resource);
        Mockito.when(resource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
        if(!offers.isEmpty()) {
            Offer offer = offers.get(0);
            Mockito.when(fragmentTemplate.createFragment(resource, offer.offerId,offer.reportingName)).thenReturn(newFragment);
            Mockito.when(newFragment.getElement(anyString())).thenReturn(contentElement);
            assert(offer.offerId == crudOperationEpc.writeJsonToCf(offers.get(0), "", resourceResolver));
        }
    }
}