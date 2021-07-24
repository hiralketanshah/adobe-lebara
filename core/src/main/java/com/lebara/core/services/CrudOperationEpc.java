package com.lebara.core.services;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.List;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.adobe.cq.dam.cfm.*;
import com.lebara.core.dto.*;
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

    static String apiEndPointUrl = null;
    static String encodingKey = null;
    static String subscriptionKey = null;


    @Activate
    public void init(CFDestinationDomain config) {
        apiEndPointUrl = config.getApiPath();
        encodingKey = config.getEncodingText();
        subscriptionKey = config.getSubscriptionKey();

    }

    public void readEPCAndCreateCF(String cfDamPath, ResourceResolver resourceResolver) {
        try {
            // Create a trust manager that does not validate certificate chains
            TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }

                @Override
                public void checkClientTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
                        throws CertificateException {
                }

                @Override
                public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
                        throws CertificateException {
                }
            }
            };

            // Install the all-trusting trust manager
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            // Create all-trusting host name verifier
            HostnameVerifier allHostsValid = new HostnameVerifier() {
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };


        } catch (NoSuchAlgorithmException e) {
            logger.error("NoSuchAlgorithmException error while creating a trust all certificate {}", e);
        } catch (KeyManagementException e) {
            logger.error("KeyManagementException error while creating a trust all certificate {}", e);
        } catch (Exception e) {
            logger.error("Exception error while creating a trust all certificate {}", e);
        }


        /**
         * Actual business logic starts from here
         */
        // Read data from EPC
        String epcJsonString = getJsonFromEPC();
        createContentFragment(epcJsonString, cfDamPath, resourceResolver);
    }

    /**
     * Read EPC Data and return the epc json data as String.
     */
    String getJsonFromEPC() {
        URL url;
        StringBuilder sb = new StringBuilder();
        try {

            url = new URL(apiEndPointUrl);
            String jsonInputString = "{\"operationName\":\"Offers\",\"variables\":{\"country\":\"GB\"},\"query\":\"query Offers($country: String!) { offers(country: $country) { offerId type billingType name reportingName isActive validityType validity cost channels { name __typename } allowances { allowanceValue account { name unit { abbreviation __typename } __typename } __typename } __typename }}\"}";
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", LebaraConstants.CONTENT_TYPE_JSON);
            connection.setRequestProperty("Ocp-Apim-Subscription-Key", subscriptionKey);
            connection.setRequestProperty("Authorization", "Basic " + encodingKey);
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            InputStream content = connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(content));
            logger.debug("response from EPC");
            String line;

            while ((line = in.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
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
                writeJsonToCf(offer, cfDamPath, offer.offerId, resourceResolver);
            } else {
                logger.debug(" CF already exist with name {} and offer id {}", offer.name, offer.offerId);
            }
        }

    }


    void writeJsonToCf(Offer offer, String cfDamPath, String offerId, ResourceResolver resourceResolver) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Resource contentFragmentModelResource = resourceResolver.getResource(LebaraConstants.CONTENT_FRAGMENT_MODEL_PATH);
            if (contentFragmentModelResource == null) {
                return;
            }
            FragmentTemplate fragmentTemplate = contentFragmentModelResource.adaptTo(FragmentTemplate.class);
            if (fragmentTemplate == null) {
                return;
            }
            ContentFragment newFragment = fragmentTemplate.createFragment(resourceResolver.getResource(cfDamPath), offerId, offer.reportingName);

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
            newFragment.getElement("allowances").setContent(gson.toJson(offer.allowances), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);
            newFragment.getElement("typename").setContent(String.valueOf(offer.__typename), LebaraConstants.CONTENT_TYPE_TEXT_PLAIN);

        } catch (ContentFragmentException e) {
            e.printStackTrace();
        }

    }


}


