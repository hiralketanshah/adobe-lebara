package com.lebara.core.services;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import com.adobe.cq.dam.cfm.*;
import com.lebara.core.dto.*;
import com.lebara.core.utils.CFUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
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
@Designate(ocd = CFDestinationDomain.class)
public class CrudOperationEpc {
    private static final Logger logger = LoggerFactory.getLogger(CrudOperationEpc.class);

    String apiEndPointUrl = StringUtils.EMPTY;


    @Activate
    public void init(CFDestinationDomain config) {
        apiEndPointUrl = config.getApiPath();
    }

    public void readEPCAndCreateCF(String cfDamPath, ResourceResolver resourceResolver) {
        // Read data from EPC
        String countryCode = CFUtils.getCountryCodeFromPayloadPath(cfDamPath);
        String epcJsonString = getJsonFromEPC(apiEndPointUrl, countryCode);
        createContentFragment(epcJsonString, cfDamPath, resourceResolver);
    }

    /**
     * Read EPC Data and return the epc json data as String.
     */
    String getJsonFromEPC(String apiEndPointUrl, String countryCode) {
        URL url;
        StringBuilder sb = new StringBuilder();
        try {
            url = new URL(apiEndPointUrl);
            String jsonInputString = "{\"query\":\"query {\\r\\n    getCurrentOffers(channel: \\\"App\\\", country: \\\"" +
                    countryCode +
                    "\\\") {\\r\\n          offerId\\r\\n          name\\r\\n          validity\\r\\n          cost\\r\\n          allowances \\r\\n            {\\r\\n              allowanceValue\\r\\n              account {\\r\\n                name\\r\\n                unit {\\r\\n                  abbreviation\\r\\n                }\\r\\n              }\\r\\n            }\\r\\n    }\\r\\n}\",\"variables\":{}}";
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

    void createContentFragment(String epcJsonString, String cfDamPath, ResourceResolver resourceResolver) {
        RootRead convertedEpcJsonObject = new Gson().fromJson(epcJsonString, RootRead.class);
        List<Offer> offers = convertedEpcJsonObject.getData().getOffers();
        logger.debug("total offers returned from epc is {}", offers.size());
        for (Offer offer : offers) {
            String cfPath = cfDamPath + "/" + offer.offerId;
            if (resourceResolver.getResource(cfPath) == null) {
                String offerId = writeJsonToCf(offer, cfDamPath, resourceResolver);
                logger.debug("content fragment created for offer id {}", offerId);
            } else {
                logger.debug("CF already exist with name {} and offer id {} at {}", offer.name, offer.offerId, cfPath);
            }
        }

    }


    String writeJsonToCf(Offer offer, String cfDamPath, ResourceResolver resourceResolver) {
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
            ContentFragment newFragment = fragmentTemplate.createFragment(resourceResolver.getResource(cfDamPath), offer.offerId, offer.reportingName);

            newFragment.getElement("offerid").setContent(offer.offerId, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("type").setContent(offer.type, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("billingtype").setContent(offer.billingType, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("name").setContent(offer.name, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("reportingname").setContent(offer.reportingName, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("validity").setContent(String.valueOf(offer.validity), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("active").setContent(String.valueOf(offer.isActive), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("validitytype").setContent(offer.validityType, LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("cost").setContent(String.valueOf(offer.cost), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("channels").setContent(gson.toJson(offer.channels), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);

            List<String> cfAllowanceArray = new ArrayList<>();
            for (Allowance allowances : offer.allowances) {
                CFAllowance cfAllowance = new CFAllowance();
                cfAllowance.setValue(allowances.getAllowanceValue());
                cfAllowance.setName(allowances.getAccount().getName());
                cfAllowance.setUnit(allowances.getAccount().getUnit().getAbbreviation());
                cfAllowanceArray.add(gson.toJson(cfAllowance));
            }

            if (cfAllowanceArray.size() > 0) {
                FragmentData fd = newFragment.getElement("allowancesList").getValue();
                fd.setValue(cfAllowanceArray.toArray(new String[0]));
                newFragment.getElement("allowancesList").setValue(fd);
            }
            newFragment.getElement("typename").setContent(String.valueOf(offer.typeName), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
        } catch (ContentFragmentException e) {
            logger.error("ContentFragmentException {}", e);
        }
        return offer.offerId;

    }


}


