package com.lebara.core.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.lebara.core.dto.CountryInfo;
import com.lebara.core.dto.PlanInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.google.gson.Gson;
import com.lebara.core.dto.CFAllowance;
import com.lebara.core.dto.OfferFragmentBean;

public class CFUtils {

    private CFUtils() {
        // Private Constructor
    }

    public static String getCountryCodeFromPayloadPath(String payloadPath) {
        if (StringUtils.containsIgnoreCase(payloadPath, "markets/de")) {
            return "DE";
        }
        if (StringUtils.containsIgnoreCase(payloadPath, "markets/dk")) {
            return "DK";
        }
        if (StringUtils.containsIgnoreCase(payloadPath, "markets/uk")) {
            return "GB";
        }
        if (StringUtils.containsIgnoreCase(payloadPath, "markets/fr")) {
            return "FR";
        }
        if (StringUtils.containsIgnoreCase(payloadPath, "markets/nl")) {
            return "NL";
        }
        return StringUtils.EMPTY;
    }

    public static <T> List<T> convertStringArrayToList(String[] stringArray, Class<T> T) {
        Gson gson = new Gson();
        return Arrays.stream(stringArray).map(al -> gson.fromJson(al, T)).collect(Collectors.toList());
    }

    public static String getElementValue(ContentFragment cf, String elementName) {
        return cf.getElement(elementName) == null ? StringUtils.EMPTY : cf.getElement(elementName).getContent();
    }

    public static String[] getElementArrayValue(ContentFragment cf, String elementName) {
        return cf.getElement(elementName) == null ? new String[0]
                : cf.getElement(elementName).getValue().getValue(String[].class);
    }

    public static List<OfferFragmentBean> getCfDetails(String cfPath, ResourceResolver resourceResolver) {
        List<OfferFragmentBean> resultList = new ArrayList<>();
        if (StringUtils.isNotBlank(cfPath)) {
            Resource cfResource = resourceResolver.getResource(cfPath);
            OfferFragmentBean offerFragmentBean=populateOffers(cfResource);
            if(offerFragmentBean !=null) {
            resultList.add(offerFragmentBean);
            }
        }
        return resultList;
    }

    public static OfferFragmentBean populateOffers( Resource cfResource) {
        OfferFragmentBean offerFragmentBean = null;
        if (null != cfResource) {
            ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != offerFragment) {
                offerFragmentBean = new OfferFragmentBean();
                offerFragmentBean.setCost(CFUtils.getElementValue(offerFragment, "cost"));
                offerFragmentBean.setValidity(CFUtils.getElementValue(offerFragment, "validity"));
                offerFragmentBean.setId(CFUtils.getElementValue(offerFragment, "offerid"));
                if (offerFragment.getElement("allowancesList") != null) {
                    String[] allowanceArray = CFUtils.getElementArrayValue(offerFragment, "allowancesList");
                    List<CFAllowance> allowanceList = CFUtils.convertStringArrayToList(allowanceArray,
                            CFAllowance.class);
                    offerFragmentBean.setAllowanceList(allowanceList);
                }
                
            }
        }
        return offerFragmentBean;
    }

    public static PlanInfo populatePlans( Resource cfPlanResource) {
        PlanInfo planInfo = null;
        if (null != cfPlanResource) {
            ContentFragment cfPlanFragment = cfPlanResource.adaptTo(ContentFragment.class);
            if (null != cfPlanFragment) {
                planInfo = new PlanInfo();
                planInfo.setTitle(cfPlanFragment.getElement("title").getContent());
                planInfo.setCountryTitle(cfPlanFragment.getElement("countryTitle").getContent());
                planInfo.setListPlanItem(CFUtils.getElementArrayValue(cfPlanFragment, "listPlanItem"));
                planInfo.setCountryList(CFUtils.convertStringArrayToList(CFUtils.getElementArrayValue( cfPlanFragment, "countryList"), CountryInfo.class));
            }
        }
        return planInfo;
    }

    
   public static  List<OfferFragmentBean>  getCfList( Resource cfResource,  ResourceResolver resourceResolver) {
       List<OfferFragmentBean> bundlesList =  new ArrayList<OfferFragmentBean>();
       if (null != cfResource) {
           for (Resource offer : cfResource.getChildren()) {
               String cfPath = AemUtils.getStringProperty(offer, "cfPath");
               bundlesList.addAll(CFUtils.getCfDetails(cfPath, resourceResolver));
           }
       }
    return bundlesList;
   }

}
