package com.lebara.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PurchaseSummaryExporter.class,
		ComponentExporter.class }, resourceType = PurchaseSummaryExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PurchaseSummaryExporter implements ComponentExporter {

	protected static final String RESOURCE_TYPE = "lebara/components/purchasesummary";

	@ScriptVariable
	protected Resource resource;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String buttonLabel;

	@ValueMapValue
	private String editLabel;

	@ValueMapValue
	private String businessSubscriptionLabel;

	@ValueMapValue
	private String unlimitedCallingTextingLabel;

	@ValueMapValue
	private String paymentOptionLabel;

	@ValueMapValue
	private String paymentOptionSublabel;

	@ValueMapValue
	private String activationFeeLabel;

	@ValueMapValue
	private String discountLabel;

	public String getTitle() {
		return title;
	}

	public String getButtonLabel() {
		return buttonLabel;
	}

	public String getEditLabel() {
		return editLabel;
	}

	public String getBusinessSubscriptionLabel() {
		return businessSubscriptionLabel;
	}

	public String getUnlimitedCallingTextingLabel() {
		return unlimitedCallingTextingLabel;
	}

	public String getPaymentOptionLabel() {
		return paymentOptionLabel;
	}

	public String getPaymentOptionSublabel() {
		return paymentOptionSublabel;
	}

	public String getActivationFeeLabel() {
		return activationFeeLabel;
	}

	public String getDiscountLabel() {
		return discountLabel;
	}

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

}
