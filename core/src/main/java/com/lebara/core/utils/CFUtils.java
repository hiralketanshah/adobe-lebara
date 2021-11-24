package com.lebara.core.utils;

import java.util.*;
import java.util.stream.Collectors;

import com.day.cq.i18n.I18n;
import com.google.gson.JsonSyntaxException;
import com.lebara.core.dto.*;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CFUtils {

    private CFUtils() {
        // Private Constructor
    }

    final static Logger LOGGER = LoggerFactory.getLogger(CFUtils.class);

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
        List<T> list = new ArrayList<>();
        if (stringArray == null || ArrayUtils.isEmpty(stringArray)) {
            return list;
        }
        Gson gson = new Gson();
        try {
            list = Arrays.stream(stringArray).map(al -> gson.fromJson(al, T)).collect(Collectors.toList());
        } catch (IllegalStateException | JsonSyntaxException e) {
            LOGGER.error("[convertStringArrayToList] error while parsing json {}", e);
        }
        return list;
    }

    public static String getElementValue(ContentFragment cf, String elementName) {
        return cf.getElement(elementName) == null ? StringUtils.EMPTY : cf.getElement(elementName).getContent();
    }

    public static String[] getElementArrayValue(ContentFragment cf, String elementName) {
        if (cf.getElement(elementName) == null) {
            return new String[0];
        }
        return StringUtils.isBlank(cf.getElement(elementName).getContent()) ? new String[0]
                : cf.getElement(elementName).getValue().getValue(String[].class);
    }

    public static List<OfferFragmentBean> getCfDetails(String cfPath, ResourceResolver resourceResolver, I18n i18n) {
        List<OfferFragmentBean> resultList = new ArrayList<>();
        if (StringUtils.isNotBlank(cfPath)) {
            Resource cfResource = resourceResolver.getResource(cfPath);
            OfferFragmentBean offerFragmentBean=populateOffers(cfResource, i18n);
            if(offerFragmentBean !=null) {
            resultList.add(offerFragmentBean);
            }
        }
        return resultList;
    }

    public static List<SelectBean> populateCountryInfo(Resource cfResource) {
        if (null != cfResource) {
            ContentFragment countryFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != countryFragment) {
                List<SelectBean> countries = convertStringArrayToList(CFUtils.getElementArrayValue(countryFragment, "countryInfo"), SelectBean.class);
                for (int i = 0; i < countries.size(); i++) {
                    countries.get(i).setKey(String.valueOf(i));
                    countries.get(i).setUrl(countries.get(i).getValue());
                    countries.get(i).setValue(countries.get(i).getName());
                }
                return countries;
            }
        }
        return new ArrayList<>();
    }

    public static List<String> populateTopupInfo(Resource cfResource) {
        List<String> topups = new ArrayList<>();
        if (null != cfResource) {
            ContentFragment topupFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != topupFragment) {
                topups = Arrays.asList(CFUtils.getElementArrayValue(topupFragment, "value"));
            }
        }
        return topups;
    }

    public static List<SelectBean> populateCityInfo(Resource cfResource) {
        List<SelectBean> cities = new ArrayList<>();
        if (null != cfResource) {
            ContentFragment cityFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != cityFragment) {
                String[] cityArray = CFUtils.getElementArrayValue(cityFragment, "value");
                for (int i = 0; i < cityArray.length; i++) {
                    SelectBean city = new SelectBean();
                    city.setValue(cityArray[i]);
                    city.setName(cityArray[i]);
                    city.setKey(String.valueOf(i));
                    cities.add(city);
                }
                return cities;
            }
        }
        return cities;
    }

    public static OfferFragmentBean populateOffers( Resource cfResource, I18n i18n) {
        OfferFragmentBean offerFragmentBean = null;
        if (null != cfResource) {
            ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != offerFragment) {
                offerFragmentBean = new OfferFragmentBean();
                offerFragmentBean.setCost(CFUtils.getElementValue(offerFragment, "cost"));
                offerFragmentBean.setPlanName(CFUtils.getElementValue(offerFragment, "name"));
                offerFragmentBean.setValidity(CFUtils.getElementValue(offerFragment, "validity") + " " + (i18n == null ? "Days" : i18n.get("Days")));
                offerFragmentBean.setValidityText(CFUtils.getElementValue(offerFragment, "validityText"));
                offerFragmentBean.setMinutesToCountriesText(CFUtils.getElementValue(offerFragment, "minutesToCountriesText"));
                offerFragmentBean.setDataVolumeText(CFUtils.getElementValue(offerFragment, "dataVolumeText"));
                offerFragmentBean.setId(CFUtils.getElementValue(offerFragment, "offerid"));
                offerFragmentBean.setOfferType(CFUtils.getElementValue(offerFragment, "offerType"));
                if (offerFragment.getElement("additionalOffers") != null) {
                    offerFragmentBean.setAdditionalOffers(CFUtils.getElementValue(offerFragment, "additionalOffers"));
                }
                if (offerFragment.getElement("planInfoPath") != null) {
                    ResourceResolver resourceResolver = cfResource.getResourceResolver();
                    Resource cfPlanResource = resourceResolver.getResource(CFUtils.getElementValue(offerFragment, "planInfoPath"));
                    PlanInfo planInfo = CFUtils.populatePlans(cfPlanResource);
                    if (planInfo != null) {
                        offerFragmentBean.setPlanInfo(planInfo);
                    }
                }
                if (offerFragment.getElement("allowancesList") != null) {
                    String[] allowanceArray = CFUtils.getElementArrayValue(offerFragment, "allowancesList");
                    List<CFAllowance> allowanceList = CFUtils.convertStringArrayToList(allowanceArray, CFAllowance.class);
                    for (CFAllowance allowance : allowanceList) {
                        allowance.setFormatedValue(formatedValue(allowance.getUnit(), allowance.getValue(), i18n));
                    }
                    offerFragmentBean.setAllowanceList(allowanceList);
                }
            }
        }
        return offerFragmentBean;
    }

    private static String formatedValue(String unit, String val, I18n i18n) {
        String formattedValue = StringUtils.EMPTY;
        if (StringUtils.isNotBlank(unit) && StringUtils.isNumeric(val)) {
            int value = Integer.parseInt(val);
            switch (unit.toLowerCase()) {
                case "mb":
                    formattedValue = (value >= 1024) ? (value / 1024) + " GB" : value + " MB";
                    break;
                case "sms":
                    formattedValue = value + " SMS";
                    break;
                case "mins":
                    formattedValue = value + " " + (i18n == null ? "Minutes" : i18n.get("Minutes"));
                    break;
                default :
                    formattedValue = StringUtils.EMPTY;
            }
        }
        return formattedValue;
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

   public static  List<OfferFragmentBean>  getCfList( Resource cfResource,  ResourceResolver resourceResolver, I18n i18n) {
       List<OfferFragmentBean> bundlesList =  new ArrayList<OfferFragmentBean>();
       if (null != cfResource) {
           for (Resource offer : cfResource.getChildren()) {
               String cfPath = AemUtils.getStringProperty(offer, "cfPath");
               bundlesList.addAll(CFUtils.getCfDetails(cfPath, resourceResolver, i18n));
           }
       }
    return bundlesList;
   }

}
