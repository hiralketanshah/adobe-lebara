package com.lebara.core.services;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.net.ssl.HttpsURLConnection;

import com.adobe.cq.dam.cfm.*;
import com.day.cq.commons.jcr.JcrUtil;
import com.lebara.core.dto.*;
import com.lebara.core.dto.topup.Root;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lebara.core.utils.LebaraConstants;

/**
 * This service class is responsible for connecting to EPC and fetching the plans information as json from EPC.
 * Then this service creates a content fragment for each plan.
 */
@Component(service = CrudOperationEpc.class, immediate = true, property = {"process.label=Lebara EPC data operation Service"}, configurationPid = "com.lebara.core.services.CrudOperationEpc")
public class CrudOperationEpc {
    private static final Logger logger = LoggerFactory.getLogger(CrudOperationEpc.class);
    @Reference
    private GlobalOsgiService globalOsgiService;
    String apiEndPointUrl = StringUtils.EMPTY;

    @Activate
    public void init() {
        apiEndPointUrl = globalOsgiService.getApiHostUri().concat(globalOsgiService.getGqlEndpoint());
    }

    public void readEPCAndCreateCF(String cfDamPath, ResourceResolver resourceResolver) {
        // Read data from EPC
        String countryCode = CFUtils.getCountryCodeFromPayloadPath(cfDamPath);
        String fragmentPathInDam;
        Map<String, String> offerTypes = new HashMap<>();
        //getCurrentOffers for prepaid offers
        offerTypes.put("getCurrentOffers", "prepaid");
        //getSimOnlyOffers for postpaid offers
        offerTypes.put("getSimOnlyOffers", "postpaid");
        //getAddOns for Boltons
        offerTypes.put("getAddOns", "bolton");
        //getAddOns for TopUp
        offerTypes.put("getTopUps", "topup");
        for (String offerType : offerTypes.keySet()) {
            String epcJsonString = getJsonFromEPC(apiEndPointUrl, countryCode, offerType);
            fragmentPathInDam = cfDamPath + "/" + offerTypes.get(offerType);
            try {
                JcrUtil.createPath(fragmentPathInDam, "sling:Folder", resourceResolver.adaptTo(Session.class));
            } catch (RepositoryException e) {
                logger.error("errow while creating the folder {} {}", fragmentPathInDam, e);
            }
            if (StringUtils.equalsIgnoreCase(offerType, "getTopUps")) {
                createTopupContentFragment(epcJsonString, fragmentPathInDam, resourceResolver, offerTypes.get(offerType));
            } else {
                createContentFragment(epcJsonString, fragmentPathInDam, resourceResolver, offerTypes.get(offerType));
            }
        }
    }

    /**
     * Read EPC Data and return the epc json data as String.
     */
    String getJsonFromEPC(String apiEndPointUrl, String countryCode, String OfferType) {
        URL url;
        StringBuilder sb = new StringBuilder();
        try {
            url = new URL(apiEndPointUrl);
            String jsonInputString;
            if (StringUtils.equalsIgnoreCase(OfferType, "getTopUps")) {
                jsonInputString = getTopUpEpcString(countryCode);
            } else {
                jsonInputString = getEpcString(countryCode, OfferType);
            }

            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", LebaraConstants.CONTENT_TYPE_JSON);
            connection.setRequestProperty("Accept", LebaraConstants.CONTENT_TYPE_JSON);
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            InputStream content = connection.getInputStream();
            try (BufferedReader in = new BufferedReader(new InputStreamReader(content))) {
                logger.debug("response from EPC");
                String line;
                while ((line = in.readLine()) != null) {
                    sb.append(line);
                }
            }
        } catch (IOException e) {
            logger.error("IOException error while fetching EPC data {}, {}", e.getMessage(), e);
        } catch (Exception e) {
            logger.error("error while fetching EPC data {}, {}", e.getMessage(), e);
        }
        logger.debug("response from EPC {}", sb);
        return sb.toString();
    }

    private String getEpcString(String countryCode, String OfferType) {
        return "{\"query\":\"query {\\r\\n  offers : " + OfferType + "(channel: \\\"Web\\\", country: \\\"" + countryCode + "\\\") {\\r\\n    offerId\\r\\n    name\\r\\n    validity\\r\\n    cost\\r\\n    allowances {\\r\\n      allowanceValue\\r\\n      account {\\r\\n        name\\r\\n        unit {\\r\\n          abbreviation\\r\\n        }\\r\\n      }\\r\\n    }\\r\\n  }\\r\\n}\",\"variables\":{}}";
    }

    private String getTopUpEpcString(String countryCode) {
        return "{\"query\":\"query {\\r\\n  offers: getTopUps(channel: \\\"Web\\\",country: \\\"" + countryCode + "\\\")\\r\\n}\",\"variables\":{}}";
    }

    void createContentFragment(String epcJsonString, String cfDamPath, ResourceResolver resourceResolver, String offerType) {
        RootRead convertedEpcJsonObject = new Gson().fromJson(epcJsonString, RootRead.class);
        if (convertedEpcJsonObject == null || convertedEpcJsonObject.getData() == null) {
            return;
        }
        List<Offer> offers = convertedEpcJsonObject.getData().getOffers();
        if (!CollectionUtils.isEmpty(offers)) {
            logger.debug("total offers returned from epc is {}", offers.size());
            for (Offer offer : offers) {
                String validOfferName = JcrUtil.createValidName(offer.name);
                String cfPath = cfDamPath + "/" + validOfferName;
                if (resourceResolver.getResource(cfPath) == null) {
                    String offerId = writeJsonToCf(offer, cfDamPath, resourceResolver, validOfferName, offerType);
                    logger.debug("content fragment created for offer id {}", offerId);
                } else {
                    logger.debug("CF already exist with name {} and offer id {} at {}", validOfferName, offer.offerId, cfPath);
                }
            }
        }

    }

    void createTopupContentFragment(String epcJsonString, String cfDamPath, ResourceResolver resourceResolver, String offerType) {
        Root convertedEpcJsonObject = new Gson().fromJson(epcJsonString, Root.class);
        if (convertedEpcJsonObject == null || convertedEpcJsonObject.getData() == null || convertedEpcJsonObject.getData().getOffers() == null) {
            return;
        }
        try {
            Resource contentFragmentModelResource = resourceResolver.getResource(LebaraConstants.TOPUP_CONTENT_FRAGMENT_MODEL_PATH);
            if (contentFragmentModelResource == null) {
                return;
            }
            FragmentTemplate fragmentTemplate = contentFragmentModelResource.adaptTo(FragmentTemplate.class);
            if (fragmentTemplate == null) {
                return;
            }
            ContentFragment newFragment = fragmentTemplate.createFragment(resourceResolver.getResource(cfDamPath), "topup", "topup");
            FragmentData fd = newFragment.getElement("value").getValue();
            fd.setValue(convertedEpcJsonObject.getData().getOffers().toArray(new String[0]));
            newFragment.getElement("value").setValue(fd);
            newFragment.getElement("offerType").setContent(offerType, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);

        } catch (ContentFragmentException e) {
            logger.error("ContentFragmentException {}", e);
        }
    }


    String writeJsonToCf(Offer offer, String cfDamPath, ResourceResolver resourceResolver, String validOfferName, String offerType) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Resource contentFragmentModelResource = resourceResolver.getResource(LebaraConstants.CONTENT_FRAGMENT_MODEL_PATH);
            if (contentFragmentModelResource == null) {
                return StringUtils.EMPTY;
            }
            FragmentTemplate fragmentTemplate = contentFragmentModelResource.adaptTo(FragmentTemplate.class);
            if (fragmentTemplate == null) {
                return StringUtils.EMPTY;
            }
            ContentFragment newFragment = fragmentTemplate.createFragment(resourceResolver.getResource(cfDamPath), validOfferName, offer.name);

            newFragment.getElement("offerid").setContent(offer.offerId, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("name").setContent(offer.name, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("validity").setContent(String.valueOf(offer.validity), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("active").setContent(String.valueOf(true), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("cost").setContent(String.valueOf(offer.cost), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("offerType").setContent(offerType, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            List<String> cfAllowanceArray = new ArrayList<>();
            for (Allowance allowances : offer.allowances) {
                CFAllowance cfAllowance = new CFAllowance();
                String value = allowances.getAllowanceValue();
                String name = StringUtils.EMPTY;
                String unit = StringUtils.EMPTY;
                if (allowances.getAccount() != null && allowances.getAccount().getUnit() != null) {
                    name = allowances.getAccount().getName();
                    unit = allowances.getAccount().getUnit().getAbbreviation();
                }
                if (StringUtils.isNotBlank(value) && StringUtils.isNotBlank(name) && StringUtils.isNotBlank(unit)) {
                    cfAllowance.setValue(value);
                    cfAllowance.setName(name);
                    cfAllowance.setUnit(unit);
                    cfAllowanceArray.add(gson.toJson(cfAllowance));
                }
            }

            if (cfAllowanceArray.size() > 0) {
                FragmentData fd = newFragment.getElement("allowancesList").getValue();
                fd.setValue(cfAllowanceArray.toArray(new String[0]));
                newFragment.getElement("allowancesList").setValue(fd);
            }
        } catch (ContentFragmentException e) {
            logger.error("ContentFragmentException {}", e);
        }
        return offer.offerId;

    }


}


