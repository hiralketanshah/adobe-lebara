package com.lebara.core.models;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.lebara.core.dto.*;
import com.lebara.core.utils.AemUtils;
import com.lebara.core.utils.CFUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { PostPaidPlansExporter.class,
		ComponentExporter.class }, resourceType = PostPaidPlansExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PostPaidPlansExporter implements ComponentExporter {

	/**
	 * The resource type.
	 */
	protected static final String RESOURCE_TYPE = "lebara/components/postpaidPlans";

	@SlingObject
	private ResourceResolver resourceResolver;

	@ScriptVariable
	private Resource resource;

	@ValueMapValue
	private String durationTitle;

	@ChildResource
	private Resource duration;

	@ValueMapValue
	private String bundleTitle;

	@ValueMapValue
	private String bundleDescription;

	@ChildResource
	private Resource bundle;

	@ValueMapValue
	private String callingTexting;

	@ValueMapValue
	private String cfPathCalling;

	@ValueMapValue
	private String speedTitle;

	@ValueMapValue
	private String cfPathSpeed;

	@ValueMapValue
	private String extraOptionsTitle;

	@ValueMapValue
	private String extraOptionsDescription;

	@ValueMapValue
	private String cfPathExtraOption;

	@ValueMapValue
	private String grandTotalTitle;

	@ValueMapValue
	private String activationTitle;

	@ValueMapValue
	private String totalTitle;

	@ValueMapValue
	private String subscriptionTitle;

	/// plan details another cf
	@ValueMapValue
	private String cfPathOptionDetails;

	@ValueMapValue
	private String orderNowTitle;

	public List<PlanInfo> getPlanDetail() {
		List<PlanInfo> plans = new ArrayList<>();
		if (StringUtils.isNotBlank(cfPathOptionDetails)) {
			Resource cfPlanResource = resourceResolver.getResource(cfPathOptionDetails);
			populateOffer(plans, cfPlanResource);

		}
		return plans;
	}

	private void populateOffer(List<PlanInfo> plans, Resource cfPlanResource) {
		if (null != cfPlanResource) {
			ContentFragment cfPlanFragment = cfPlanResource.adaptTo(ContentFragment.class);
			if (null != cfPlanFragment) {
				PlanInfo planInfo = new PlanInfo();
				planInfo.setTitle(cfPlanFragment.getElement("title").getContent());
				planInfo.setCountryTitle(cfPlanFragment.getElement("countryTitle").getContent());
				planInfo.setListPlanItem(CFUtils.getElementArrayValue(cfPlanFragment, "listPlanItem"));
				planInfo.setCountryList(CFUtils.convertStringArrayToList(
						CFUtils.getElementArrayValue(cfPlanFragment, "countryList"), CountryInfo.class));
				plans.add(planInfo);
			}
		}
	}

	public List<Duration> getDurationDetails() {
		List<Duration> durationList = new ArrayList<>();
		if (null != duration) {
			for (Resource durationResource : duration.getChildren()) {
				Duration durationDetails = durationResource.adaptTo(Duration.class);
				durationList.add(durationDetails);
			}
		}
		return durationList;
	}

	public List<OfferFragmentBean> getCallingAndTexting() {
		return CFUtils.getCfDetails(cfPathCalling, resourceResolver);
	}

	public List<OfferFragmentBean> getExtraOption() {
		return CFUtils.getCfDetails(cfPathExtraOption, resourceResolver);
	}

	public List<OfferFragmentBean> getSpeeds() {
		return CFUtils.getCfDetails(cfPathSpeed, resourceResolver);
	}

	public List<OfferFragmentBean> getBundles() {
		List<OfferFragmentBean> bundlesList = new ArrayList<>();
		if (null != bundle) {
			for (Resource offer : bundle.getChildren()) {
				String cfPath = AemUtils.getStringProperty(offer, "cfPath");
				bundlesList.addAll(CFUtils.getCfDetails(cfPath, resourceResolver));

			}
		}
		return bundlesList;
	}

	@Override
	public String getExportedType() {

		return resource.getResourceType();
	}

	public String getDurationTitle() {
		return durationTitle;
	}

	public String getBundleTitle() {
		return bundleTitle;
	}

	public String getBundleDescription() {
		return bundleDescription;
	}

	public String getCallingTexting() {
		return callingTexting;
	}

	public String getSpeedTitle() {
		return speedTitle;
	}

	public String getExtraOptionsTitle() {
		return extraOptionsTitle;
	}

	public String getExtraOptionsDescription() {
		return extraOptionsDescription;
	}

	public String getGrandTotalTitle() {
		return grandTotalTitle;
	}

	public String getActivationTitle() {
		return activationTitle;
	}

	public String getTotalTitle() {
		return totalTitle;
	}

	public String getSubscriptionTitle() {
		return subscriptionTitle;
	}

	public String getOrderNowTitle() {
		return orderNowTitle;
	}
}
