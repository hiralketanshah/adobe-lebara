package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InternationalRatesItem {

	@ValueMapValue
	private String contractTitle;

	@ValueMapValue
	private String landlineCallRate;

	@ValueMapValue
	private String mobileCallRate;

	@ValueMapValue
	private String smsRate;

	@ValueMapValue
	private String message;

	public String getContractTitle() {
		return contractTitle;
	}

	public String getLandlineCallRate() {
		return landlineCallRate;
	}

	public String getMobileCallRate() {
		return mobileCallRate;
	}

	public String getSmsRate() {
		return smsRate;
	}

	public String getMessage() {
		return message;
	}

}
