package com.lebara.core.utils;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.day.cq.i18n.I18n;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.lebara.core.dto.*;
import com.lebara.core.models.beans.SelectOption;
import org.apache.commons.collections.ListUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

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
            LOGGER.error("[convertStringArrayToList] error while parsing json for stringArray {} : Error message {}", Arrays.toString(stringArray), e.getMessage());
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
    public static OfferFragmentBean getCfDetails(String cfPath, ResourceResolver resourceResolver, I18n i18n) {
        OfferFragmentBean offerFragmentBean = new OfferFragmentBean();
        if (StringUtils.isNotBlank(cfPath)) {
            Resource cfResource = resourceResolver.getResource(cfPath);
            offerFragmentBean = populateOffers(cfResource, i18n);
        }
        return offerFragmentBean;
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
                Arrays.sort(cityArray);
                for (int i = 0; i < cityArray.length; i++) {
                    SelectBean city = new SelectBean();
                    city.setValue(cityArray[i]);
                    city.setName(cityArray[i]);
                    city.setKey(String.valueOf(i));
                    cities.add(city);
                }
            }
        }
        return cities;
    }

    /**
     * this methods takes the root path for fragment as an input and iterates through all
     * its child and returns a list of InternationalRateBean objects.
     */
    public static List<SelectOption> getInternationalRates(ResourceResolver resolver, String fragmentRootPath) {
        List<SelectOption> internationalRateBeanList = new ArrayList<>();
        Resource parentResource = resolver.getResource(fragmentRootPath);
        if (parentResource == null) {
            return internationalRateBeanList;
        }
        for (Resource fragment : parentResource.getChildren()) {
            ContentFragment irFragment = fragment.adaptTo(ContentFragment.class);
            if (null != irFragment) {
                String countryLandingPageUrl = CFUtils.getElementValue(irFragment, "countryLandingPageURL");
                countryLandingPageUrl = AemUtils.getLinkWithExtension(countryLandingPageUrl, resolver);
                String countryName = CFUtils.getElementValue(irFragment, "countryName");
                String countryFlag = CFUtils.getElementValue(irFragment, "countryFlag");
                if (StringUtils.isNotBlank(countryLandingPageUrl) && StringUtils.isNotBlank(countryName)) {
                    SelectOption selectOption = new SelectOption();
                    selectOption.setLabel(countryName);
                    selectOption.setValue(countryLandingPageUrl);
                    if(StringUtils.isNotBlank(countryFlag)) {
                    	selectOption.setCountryFlag(countryFlag);
                    }
                    internationalRateBeanList.add(selectOption);
                }
            }
        }
        Collections.sort(internationalRateBeanList, new SortbyNameIR() );
        return internationalRateBeanList;
    }

    /**
     * this methods takes the root path for fragment as an input and iterates through all
     * its child and returns a list of InternationalRateBean objects.
     */
    public static List<SelectBean> getWhereToCallRates(ResourceResolver resolver, String fragmentRootPath) {
        List<SelectBean> wtcBeanList = new ArrayList<>();
        Resource parentResource = resolver.getResource(fragmentRootPath);
        if (parentResource == null) {
            return wtcBeanList;
        }
        int count = 0;
        for (Resource fragment : parentResource.getChildren()) {
            ContentFragment irFragment = fragment.adaptTo(ContentFragment.class);
            if (null != irFragment) {
                String countryLandingPageUrl = CFUtils.getElementValue(irFragment, "countryLandingPageURL");
                countryLandingPageUrl = AemUtils.getLinkWithExtension(countryLandingPageUrl, resolver);
                String countryName = CFUtils.getElementValue(irFragment, "countryName");
                if (StringUtils.isNotBlank(countryLandingPageUrl) && StringUtils.isNotBlank(countryName)) {
                    SelectBean selectBean = new SelectBean();
                    selectBean.setKey(String.valueOf(count++));
                    selectBean.setUrl(countryLandingPageUrl);
                    selectBean.setValue(countryName);
                    selectBean.setName(countryName);
                    wtcBeanList.add(selectBean);
                }
            }
        }
        Collections.sort(wtcBeanList, new SortbyName());
        return wtcBeanList;
    }

    static class SortbyName implements Comparator<SelectBean> {
        // Sorting in ascending order of name
        public int compare(SelectBean a, SelectBean b) {
            if (a != null && b != null) {
                return a.getName().compareTo(b.getName());
            }
            return 0;
        }
    }

    static class SortbyNameIR implements Comparator<SelectOption> {
        // Sorting in ascending order of name
        public int compare(SelectOption a, SelectOption b) {
            if (a != null && b != null) {
                return a.getLabel().compareTo(b.getLabel());
            }
            return 0;
        }
    }

    public static ContentFragment getContentFragment(ResourceResolver resourceResolver, String cfPath) {
        Resource cfResource = resourceResolver.getResource(cfPath);
        if (cfResource != null) {
            return cfResource.adaptTo(ContentFragment.class);
        }
        return null;
    }

    public static PromotionFragmentBean populatePromotions(ResourceResolver resourceResolver, String promotionFragPath){
        Resource promotionalFragres = resourceResolver.getResource(promotionFragPath);
        PromotionFragmentBean promotionFragmentBean = new PromotionFragmentBean();
        if (promotionalFragres != null) {
            ContentFragment promotionFragment = promotionalFragres.adaptTo(ContentFragment.class);
            if (promotionFragment != null) {
                if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionId"))) {
                    promotionFragmentBean.setPromotionId(CFUtils.getElementValue(promotionFragment, "promotionId"));
                }
                if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionDetails"))) {
                    promotionFragmentBean.setPromotionDetails(CFUtils.getElementValue(promotionFragment, "promotionDetails"));
                }
                if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionalPrice"))) {
                    promotionFragmentBean.setPromotionalPrice(CFUtils.getElementValue(promotionFragment, "promotionalPrice"));
                }
                if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionData"))) {
                    promotionFragmentBean.setPromotionData(CFUtils.getElementValue(promotionFragment, "promotionData"));
                }
            }
        }
        return promotionFragmentBean;
    }
    public static OfferFragmentBean populateOffers( Resource cfResource, I18n i18n) {
        OfferFragmentBean offerFragmentBean = null;
        if (null != cfResource) {
            ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
            if (null != offerFragment) {
                offerFragmentBean = new OfferFragmentBean();
                String autoRenew = CFUtils.getElementValue(offerFragment, "showAutorenewOnCheckout");
                if (StringUtils.equalsIgnoreCase(autoRenew, "true")) {
                    offerFragmentBean.setAutoRenew("true");
                }else{
                    offerFragmentBean.setAutoRenew("false");
                }
                String activePromotion = CFUtils.getElementValue(offerFragment, "activatePromotion");
                if (StringUtils.equalsIgnoreCase(activePromotion, "true")) {
                    offerFragmentBean.setPromotionID(CFUtils.getElementValue(offerFragment, "promotionId"));
                    offerFragmentBean.setPromotionMessage(CFUtils.getElementValue(offerFragment, "promotionalMessage"));
                    String promotionFragPath = CFUtils.getElementValue(offerFragment, "promotionFragment");
                    Resource promotionalFragres = cfResource.getResourceResolver().getResource(promotionFragPath);
                    if (promotionalFragres != null) {
                        ContentFragment promotionFragment = promotionalFragres.adaptTo(ContentFragment.class);
                        if (promotionFragment != null) {
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionId"))) {
                                offerFragmentBean.setPromotionID(CFUtils.getElementValue(promotionFragment, "promotionId"));
                            }
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionalPrice"))) {
                                offerFragmentBean.setPromotionPrice(CFUtils.getElementValue(promotionFragment, "promotionalPrice"));
                            }
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(promotionFragment, "promotionData"))) {
                                offerFragmentBean.setPromotionData(CFUtils.getElementValue(promotionFragment, "promotionData"));
                            }
                            if (StringUtils.isBlank(CFUtils.getElementValue(offerFragment, "promotionalMessage"))) {
                                offerFragmentBean.setPromotionMessage(CFUtils.getElementValue(promotionFragment, "promotionDetails"));
                            }
                        }
                    }
                }
                String activateAppPromotion = CFUtils.getElementValue(offerFragment, "activateAppPromotion");
                if (StringUtils.equalsIgnoreCase(activateAppPromotion, "true")) {
                    offerFragmentBean.setAppPromotionID(CFUtils.getElementValue(offerFragment, "promotionId"));
                    offerFragmentBean.setAppPromotionMessage(CFUtils.getElementValue(offerFragment, "promotionalMessage"));
                    String promotionAppFragPath = CFUtils.getElementValue(offerFragment, "promotionAppFragment");
                    Resource appPromotionFragres = cfResource.getResourceResolver().getResource(promotionAppFragPath);
                    if (appPromotionFragres != null) {
                        ContentFragment appPromotionFragment = appPromotionFragres.adaptTo(ContentFragment.class);
                        if (appPromotionFragment != null) {
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(appPromotionFragment, "promotionId"))) {
                                offerFragmentBean.setAppPromotionID(CFUtils.getElementValue(appPromotionFragment, "promotionId"));
                            }
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(appPromotionFragment, "promotionalPrice"))) {
                                offerFragmentBean.setAppPromotionPrice(CFUtils.getElementValue(appPromotionFragment, "promotionalPrice"));
                            }
                            if (StringUtils.isNotBlank(CFUtils.getElementValue(appPromotionFragment, "promotionData"))) {
                                offerFragmentBean.setAppPromotionData(CFUtils.getElementValue(appPromotionFragment, "promotionData"));
                            }
                            if (StringUtils.isBlank(CFUtils.getElementValue(offerFragment, "promotionalMessage"))) {
                                offerFragmentBean.setAppPromotionMessage(CFUtils.getElementValue(appPromotionFragment, "promotionDetails"));
                            }
                        }
                    }
                }
                offerFragmentBean.setCost(CFUtils.getElementValue(offerFragment, "cost"));
                offerFragmentBean.setPlanName(CFUtils.getElementValue(offerFragment, "name"));
                String validity = CFUtils.getElementValue(offerFragment, "validity");
                int validityInNumber = 0;
                if (StringUtils.isNotBlank(validity)) {
                    validityInNumber = Integer.parseInt(validity);
                }
                String validityLabel = "Days";
                if (validityInNumber >= 30) {
                    validityLabel = "Month";
                    validityInNumber = validityInNumber / 30;
                }
                offerFragmentBean.setValidity( (validityInNumber == 1 ? "" : (validityInNumber + " ") )+ (i18n == null ? validityLabel : i18n.get(validityLabel)));
                offerFragmentBean.setProductInformationFile(CFUtils.getElementValue(offerFragment,"productInformationFile"));
                offerFragmentBean.setId(CFUtils.getElementValue(offerFragment, "offerid"));
                offerFragmentBean.setOfferType(CFUtils.getElementValue(offerFragment, "offerType"));
                offerFragmentBean.setChannels(CFUtils.getElementArrayValue(offerFragment, "channels"));
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

    public static String formatedValue(String unit, String val, I18n i18n) {
        String formattedValue = StringUtils.EMPTY;
        if (StringUtils.isNotBlank(unit) && StringUtils.isNumeric(val)) {
            int value = Integer.parseInt(val);
            switch (unit.toLowerCase()) {
                case "mb":
                    formattedValue = (value >= 1024) ? (new DecimalFormat("#.##").format(value/1024.0) + (i18n == null ? "GB" : i18n.get("GB"))) : (value + (i18n == null ? "MB" : i18n.get("MB")));
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
                if (cfPlanFragment.getElement("title") != null) {
                    planInfo.setTitle(cfPlanFragment.getElement("title").getContent());
                }
                if (cfPlanFragment.getElement("countryTitle") != null) {
                    planInfo.setCountryTitle(cfPlanFragment.getElement("countryTitle").getContent());
                }
                planInfo.setListPlanItem(CFUtils.getElementArrayValue(cfPlanFragment, "listPlanItem"));
                planInfo.setCountryList(setPlanInfoCountryList(cfPlanResource, cfPlanFragment));
            }
        }
        return planInfo;
    }

    private static List<CountryInfo> setPlanInfoCountryList(Resource cfPlanResource, ContentFragment cfPlanFragment) {
        String countryListFragmentPath = CFUtils.getElementValue(cfPlanFragment, "countryList");
        List<CountryInfo> countryData = getCountryList(cfPlanResource, countryListFragmentPath);

        return countryData;
    }

    public static List<CountryInfo> getCountryList(Resource cfPlanResource, String countryListFragmentPath) {
        if (StringUtils.isBlank(countryListFragmentPath)) {
            return ListUtils.EMPTY_LIST;
        }
        Resource countryListFragRes = cfPlanResource.getResourceResolver().getResource(countryListFragmentPath);
        if (countryListFragRes == null) {
            return ListUtils.EMPTY_LIST;
        }
        ContentFragment countryListFrag = countryListFragRes.adaptTo(ContentFragment.class);
        if (countryListFrag == null) {
            return ListUtils.EMPTY_LIST;
        }
        String[] individualCountryFragment = CFUtils.getElementArrayValue(countryListFrag, "countries");
        if (ArrayUtils.isEmpty(individualCountryFragment)) {
            return ListUtils.EMPTY_LIST;
        }
        List<CountryInfo> countryData = new ArrayList<>();
        CountryInfo countryInfo = null;
        for (String countryPath : individualCountryFragment) {
            countryInfo = new CountryInfo();
            Resource countryFragRes = cfPlanResource.getResourceResolver().getResource(countryPath);
            if (countryFragRes != null) {
                ContentFragment planFragment = countryFragRes.adaptTo(ContentFragment.class);
                if (planFragment != null) {
                    countryInfo.setCountryName(CFUtils.getElementValue(planFragment, "countryName"));
                    countryInfo.setCountryCode(CFUtils.getElementValue(planFragment, "countryCode"));
                    countryData.add(countryInfo);
                }
            }
        }
        return countryData;
    }

    public static  List<OfferFragmentBean>  getCfList( Resource cfResource,  ResourceResolver resourceResolver, I18n i18n) {
       List<OfferFragmentBean> bundlesList = new ArrayList<OfferFragmentBean>();
       if (null != cfResource) {
           for (Resource offer : cfResource.getChildren()) {
               String cfPath = AemUtils.getStringProperty(offer, "cfPath");
               String allowanceType = AemUtils.getStringProperty(offer, "allowanceType");
               OfferFragmentBean offerFragmentBean = CFUtils.getCfDetails(cfPath, resourceResolver, i18n);
               if (offerFragmentBean != null) {
                   offerFragmentBean.setAllowanceType(allowanceType);
               }
               bundlesList.add(offerFragmentBean);
           }
       }
       return bundlesList;
   }
    public static List<Object> getCurrentProvidersOptions(String currentProvidersOptions, ResourceResolver resourceResolver) {
        List<Object> currentProviderList = new ArrayList<>();
        if (currentProvidersOptions != null) {
            Resource currentProvidersResource = resourceResolver.getResource(currentProvidersOptions);
            if (currentProvidersResource != null && currentProvidersResource.hasChildren()) {
                Iterator<Resource> contentFragmentList = currentProvidersResource.listChildren();
                while (contentFragmentList.hasNext()) {
                    Resource currentResource = contentFragmentList.next();
                    SelectBean selectBean = new SelectBean();
                    ContentFragment currentContentFragment = currentResource.adaptTo(ContentFragment.class);
                    if (currentContentFragment != null) {
                        selectBean.setName(CFUtils.getElementValue(currentContentFragment, "name"));
                        selectBean.setValue(CFUtils.getElementValue(currentContentFragment, "value"));
                        currentProviderList.add(selectBean);
                    }
                }
            }
        }
        return currentProviderList;
    }
}
