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

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lebara.core.utils.LebaraConstants;

@Component(service = CrudOperationEpc.class, immediate=true, property = {"process.label=Lebara EPC data operation Service"}, configurationPid = "com.lebara.core.services.CrudOperationEpc")
@Designate(ocd=CFDestinationDomain.class)
public class CrudOperationEpc {
	private static final Logger logger = LoggerFactory.getLogger(CrudOperationEpc.class);

	String aemApiAssetPath = null; 
	static String apiEndPointUrl = null; 
	static String encodingKey = null; 
	static String subscriptionKey = null; 

	@Activate
	public void init(CFDestinationDomain config) {
		aemApiAssetPath = config.getConfigDoaminName();
		aemApiAssetPath = aemApiAssetPath + LebaraConstants.API_PATH;
		apiEndPointUrl = config.getApiPath();
		encodingKey = config.getEncodingText();
		subscriptionKey = config.getSubscriptionKey();

	}

	public void readEPCAndCreateCF(String cfDamPath) {
		try {
			cfDamPath = aemApiAssetPath + cfDamPath;
			// Create a trust manager that does not validate certificate chains
			TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
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
			getOffer(epcJsonString , cfDamPath);



		} catch(Exception e) {
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

			url = new URL (apiEndPointUrl);
			//String encoding = "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=";
			String jsonInputString = "{\"operationName\":\"Offers\",\"variables\":{\"country\":\"GB\"},\"query\":\"query Offers($country: String!) { offers(country: $country) { offerId type billingType name reportingName isActive validityType validity cost channels { name __typename } allowances { allowanceValue account { name unit { abbreviation __typename } __typename } __typename } __typename }}\"}";
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setDoOutput(true);
			connection.setRequestProperty  ("Content-Type",LebaraConstants.CONTENT_TYPE_JSON);
			connection.setRequestProperty  ("Ocp-Apim-Subscription-Key",subscriptionKey );
			connection.setRequestProperty  ("Authorization", "Basic " + encodingKey);
			try(OutputStream os = connection.getOutputStream()) {
				byte[] input = jsonInputString.getBytes("utf-8");
				os.write(input, 0, input.length);			
			}
			InputStream content = (InputStream)connection.getInputStream();
			BufferedReader in = new BufferedReader (new InputStreamReader (content));
			logger.debug("response from EPC" );
			String line;

			while ((line = in.readLine()) != null) {
				sb.append(line); 
			}

			logger.debug("response from EPC" +  sb.toString());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return sb.toString();
	}

	void getOffer(String epcJsonString, String cfDamPath){
		RootRead convertedepcJsonObject = new Gson().fromJson(epcJsonString, RootRead.class);
		logger.debug(""+convertedepcJsonObject.data.offers.size());
		List<Offer> offers = convertedepcJsonObject.data.offers;

		for (Offer offer : offers) {
			logger.debug(offer.name);
			if(!isCFOfferExits(offer, cfDamPath)) {
				writeJsonToCf(offer, cfDamPath);
			} else {
				logger.debug(offer.name +" "+offer.offerId +" CF already exist");
			}

		}

	}

	boolean isCFOfferExits(Offer offer, String cfDamPath){
		URL url;
		try {
			url = new URL (cfDamPath+offer.offerId+LebaraConstants.EXTENSION_JSON);
			String encoding = Base64.getEncoder().encodeToString(("admin:admin").getBytes("UTF-8"));

			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty  ("Content-Type", LebaraConstants.CONTENT_TYPE_JSON);
			connection.setRequestProperty  ("Authorization", "Basic " + encoding);
			InputStream content = (InputStream)connection.getInputStream();
			BufferedReader in = new BufferedReader (new InputStreamReader (content));
			logger.debug("getResponseMessage "+connection.getResponseMessage() );
			if(null != connection.getResponseMessage() && connection.getResponseMessage().equalsIgnoreCase("ok")) {
				return true;
			}

		}catch (FileNotFoundException fne) {
			logger.debug("fail " );
			logger.error(fne.getMessage(), fne);
			return false;
		} 
		catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return false;
	}

	void writeJsonToCf (Offer offer, String cfDamPath) {
		GsonBuilder builder = new GsonBuilder(); 
		Gson gson = builder.create(); 
		String jsonInput =  gson.toJson( getJsonforCF(offer));

		if(jsonInput.contains("cqModel")) {
			jsonInput = jsonInput.replace("cqModel", "cq:model");
		}
		String jsonInputString = jsonInput;
		logger.debug( "out put "+ jsonInputString);
		URL url;
		try {
			url = new URL (cfDamPath+offer.offerId);
			//compare - offer id with same plan and ignore if exists.
			String encoding = Base64.getEncoder().encodeToString(("admin:admin").getBytes("UTF-8"));

			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setDoOutput(true);
			connection.setRequestProperty  ("Content-Type", "application/json");
			connection.setRequestProperty  ("Authorization", "Basic " + encoding);
			try(OutputStream os = connection.getOutputStream()) {
				byte[] input = jsonInputString.getBytes("utf-8");
				os.write(input, 0, input.length);			
			}

			InputStream content = (InputStream)connection.getInputStream();
			BufferedReader in = new BufferedReader (new InputStreamReader (content));
			String line;
			while ((line = in.readLine()) != null) {
				logger.debug(line);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}


	}
	static Root getJsonforCF(Offer offer){

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
		validity.setValue(""+offer.validity);
		elements.setValidity(validity);

		Billingtype billingtype = new Billingtype();
		billingtype.setTitle("billingType");
		billingtype.setValue(offer.billingType);
		elements.setBillingtype(billingtype);

		Channels channels = new Channels();
		channels.setTitle("channels");
		if(null != offer.channels) {
			channels.setValue(new GsonBuilder().create().toJson(offer.channels));
		}
		elements.setChannels(channels);

		Allowances allowance = new Allowances();
		allowance.setTitle("allowances");
		if(null != offer.allowances) {
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
/* ObjectMapper om = new ObjectMapper();
Root root = om.readValue(myJsonString), Root.class); */
class Reportingname{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Offerid{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Name{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Validity{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Channels{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Allowances{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Billingtype{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}

class Cost{
	public String title;
	public int value;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}


}
class Type{
	public String title;
	public String value;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}



}
class Validitytype{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

}
class Active{
	public String title;
	public boolean value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Boolean getValue() {
		return value;
	}
	public void setValue(Boolean value) {
		this.value = value;
	}

}
class Typename{
	public String title;
	public String value;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}


}

class Elements{
	public Reportingname reportingname;
	public Offerid offerid;
	public Name name;
	public Validity validity;
	public Billingtype billingtype;
	public Channels channels;
	public Allowances allowances;
	public Cost cost;
	public Type type;
	public Validitytype validitytype;
	public Active active;
	public Typename typename;


	public Reportingname getReportingname() {
		return reportingname;
	}
	public void setReportingname(Reportingname reportingname) {
		this.reportingname = reportingname;
	}
	public Offerid getOfferid() {
		return offerid;
	}
	public void setOfferid(Offerid offerid) {
		this.offerid = offerid;
	}
	public Name getName() {
		return name;
	}
	public void setName(Name name) {
		this.name = name;
	}
	public Validity getValidity() {
		return validity;
	}
	public void setValidity(Validity validity) {
		this.validity = validity;
	}
	public Billingtype getBillingtype() {
		return billingtype;
	}
	public void setBillingtype(Billingtype billingtype) {
		this.billingtype = billingtype;
	}
	public Channels getChannels() {
		return channels;
	}
	public void setChannels(Channels channels) {
		this.channels = channels;
	}
	public Allowances getAllowances() {
		return allowances;
	}
	public void setAllowances(Allowances allowances) {
		this.allowances = allowances;
	}
	public Cost getCost() {
		return cost;
	}
	public void setCost(Cost cost) {
		this.cost = cost;
	}
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public Validitytype getValiditytype() {
		return validitytype;
	}
	public void setValiditytype(Validitytype validitytype) {
		this.validitytype = validitytype;
	}
	public Active getActive() {
		return active;
	}
	public void setActive(Active active) {
		this.active = active;
	}
	public Typename getTypename() {
		return typename;
	}
	public void setTypename(Typename typename) {
		this.typename = typename;
	}



}

class Properties{
	@JsonProperty("cq:model") 
	public String cqModel;
	public String title;
	public String description;
	public Elements elements;

	public String getCqModel() {
		return cqModel;
	}
	public void setCqModel(String cqModel) {
		this.cqModel = cqModel;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Elements getElements() {
		return elements;
	}
	public void setElements(Elements elements) {
		this.elements = elements;
	}
}

class Root{
	public Properties properties;

	public Properties getProperties() {
		return properties;
	}

	public void setProperties(Properties properties) {
		this.properties = properties;
	}
}


class Channel{
	public String name;
	public String __typename;
}

class Unit{
	public String abbreviation;
	public String __typename;
}

class Account{
	public String name;
	public Unit unit;
	public String __typename;
}

class Allowance{
	public int allowanceValue;
	public Account account;
	public String __typename;
}

class Offer{
	public String offerId;
	public String type;
	public String billingType;
	public String name;
	public String reportingName;
	public boolean isActive;
	public String validityType;
	public int validity;
	public int cost;
	public List<Channel> channels;
	public List<Allowance> allowances;
	public String __typename;
}

class Data{
	public List<Offer> offers;
}

class RootRead{
	public Data data;
}
