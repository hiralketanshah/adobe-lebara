package com.lebara.core.services;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.CertificateException;
import java.util.Base64;
import java.util.List;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.lebara.core.dto.*;
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

    String aemApiAssetPath = null;
    static String apiEndPointUrl = null;
    static String encodingKey = null;
    static String subscriptionKey = null;

    @Activate
    public void init(CFDestinationDomain config) {
        aemApiAssetPath = config.getConfigDomainName();
        aemApiAssetPath = aemApiAssetPath + LebaraConstants.API_PATH;
        apiEndPointUrl = config.getApiPath();
        encodingKey = config.getEncodingText();
        subscriptionKey = config.getSubscriptionKey();

    }

    public void readEPCAndCreateCF(String cfDamPath) {
        try {
            cfDamPath = aemApiAssetPath + cfDamPath;
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

            /**
             * Actual business logic starts from here
             */

            // Red data from EPC
            String epcJsonString = readJsonFromEPC();
            getOffer(epcJsonString, cfDamPath);


        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    /**
     * Read EPC Data
     */
    static String readJsonFromEPC() {
        URL url;
        StringBuffer sb = new StringBuffer();
        try {

            url = new URL(apiEndPointUrl);
            //String encoding = "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=";
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
            InputStream content = (InputStream) connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(content));
            logger.debug("response from EPC");
            String line;

            while ((line = in.readLine()) != null) {
                sb.append(line);
            }

            logger.debug("response from EPC" + sb.toString());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return sb.toString();
    }

    void getOffer(String epcJsonString, String cfDamPath) {
        RootRead convertedepcJsonObject = new Gson().fromJson(epcJsonString, RootRead.class);
        logger.debug("" + convertedepcJsonObject.getData().getOffers().size());
        List<Offer> offers = convertedepcJsonObject.getData().getOffers();

        for (Offer offer : offers) {
            logger.debug(offer.name);
            if (!isCFOfferExists(offer, cfDamPath)) {
                writeJsonToCf(offer, cfDamPath);
            } else {
                logger.debug(offer.name + " " + offer.offerId + " CF already exist");
            }
        }

    }

    boolean isCFOfferExists(Offer offer, String cfDamPath) {
        URL url;
        String cfJsonPath = cfDamPath + offer.offerId + LebaraConstants.EXTENSION_JSON;
        try {
            url = new URL(cfJsonPath);
            String encoding = Base64.getEncoder().encodeToString(("admin:admin").getBytes("UTF-8"));

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", LebaraConstants.CONTENT_TYPE_JSON);
            connection.setRequestProperty("Authorization", "Basic " + encoding);
            InputStream content = (InputStream) connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(content));
            logger.debug("getResponseMessage " + connection.getResponseMessage());
            if (null != connection.getResponseMessage() && connection.getResponseMessage().equalsIgnoreCase("ok")) {
                return true;
            }

        } catch (FileNotFoundException fne) {
            logger.debug("content fragment not found for {} ", cfJsonPath);
            logger.error(fne.getMessage(), fne);
            return false;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return false;
        }
        return false;
    }

    void writeJsonToCf(Offer offer, String cfDamPath) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        String jsonInput = gson.toJson(getJsonforCF(offer));

        if (jsonInput.contains("cqModel")) {
            jsonInput = jsonInput.replace("cqModel", "cq:model");
        }
        String jsonInputString = jsonInput;
        logger.debug("out put " + jsonInputString);
        URL url;
        try {
            url = new URL(cfDamPath + offer.offerId);
            //compare - offer id with same plan and ignore if exists.
            String encoding = Base64.getEncoder().encodeToString(("admin:admin").getBytes("UTF-8"));

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Basic " + encoding);
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            InputStream content = (InputStream) connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(content));
            String line;
            while ((line = in.readLine()) != null) {
                logger.debug(line);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }


    }

    static Root getJsonforCF(Offer offer) {

        Elements elements = new Elements();
        Reportingname reportingname = new Reportingname();
        reportingname.setTitle("reportingName");
        reportingname.setValue(offer.reportingName);
        elements.setReportingname(reportingname);

        Offerid offerid = new Offerid();
        offerid.setTitle("offerId");
        offerid.setValue(offer.offerId);
        elements.setOfferid(offerid);

        Name name = new Name();
        name.setTitle("name");
        name.setValue(offer.name);
        elements.setName(name);

        Validity validity = new Validity();
        validity.setTitle("validity");
        validity.setValue("" + offer.validity);
        elements.setValidity(validity);

        Billingtype billingtype = new Billingtype();
        billingtype.setTitle("billingType");
        billingtype.setValue(offer.billingType);
        elements.setBillingtype(billingtype);

        Channels channels = new Channels();
        channels.setTitle("channels");
        if (null != offer.channels) {
            channels.setValue(new GsonBuilder().create().toJson(offer.channels));
        }
        elements.setChannels(channels);

        Allowances allowance = new Allowances();
        allowance.setTitle("allowances");
        if (null != offer.allowances) {
            allowance.setValue(new GsonBuilder().create().toJson(offer.allowances));
        }
        elements.setAllowances(allowance);

        Cost cost = new Cost();
        cost.setTitle("cost");
        cost.setValue(offer.cost);
        elements.setCost(cost);

        Type type = new Type();
        type.setTitle("type");
        type.setValue(offer.type);
        elements.setType(type);

        Validitytype validitytype = new Validitytype();
        validitytype.setTitle("validitytype");
        validitytype.setValue(offer.validityType);
        elements.setValiditytype(validitytype);

        Active active = new Active();
        active.setTitle("isActive");
        active.setValue(offer.isActive);
        elements.setActive(active);

        Typename typename = new Typename();
        typename.setTitle("typename");
        typename.setValue(offer.__typename);
        elements.setTypename(typename);

        Properties properties = new Properties();
        properties.setCqModel(LebaraConstants.CONTENT_FRAGMENT_MODEL_PATH);
        properties.setTitle(offer.name);
        properties.setDescription(offer.reportingName);
        properties.setElements(elements);
        Root root = new Root();
        root.setProperties(properties);

        return root;

    }
}


