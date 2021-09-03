package com.lebara.core.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.google.gson.Gson;
import com.lebara.core.dto.CFAllowance;
import com.lebara.core.dto.OfferFragmentBean;

public class CFUtils {

	private CFUtils() {
		// Private Constructor
	}

	public static <T> List<T> convertStringArrayToList(String[] stringArray, Class<T> T) {
		Gson gson = new Gson();
		return Arrays.stream(stringArray).map(al -> gson.fromJson(al, T)).collect(Collectors.toList());
	}

	public static String getElementValue(ContentFragment cf, String elementName) {
		return cf.getElement(elementName) == null ? StringUtils.EMPTY : cf.getElement(elementName).getContent();
	}

	public static String[] getElementArrayValue(ContentFragment cf, String elementName) {
		return cf.getElement(elementName) == null ? new String[0]
				: cf.getElement(elementName).getValue().getValue(String[].class);
	}

	public static List<OfferFragmentBean> getCfDetails(String cfPath, ResourceResolver resourceResolver) {
		List<OfferFragmentBean> resultList = new ArrayList<>();
		if (StringUtils.isNotBlank(cfPath)) {
			Resource cfResource = resourceResolver.getResource(cfPath);
			OfferFragmentBean offerFragmentBean=populateOffers(cfResource);
			if(offerFragmentBean !=null)
			resultList.add(offerFragmentBean);

		}
		return resultList;
	}

	public static OfferFragmentBean populateOffers( Resource cfResource) {
		OfferFragmentBean offerFragmentBean=null;
		if (null != cfResource) {
			ContentFragment offerFragment = cfResource.adaptTo(ContentFragment.class);
			if (null != offerFragment) {
				 offerFragmentBean = new OfferFragmentBean();
				offerFragmentBean.setCost(CFUtils.getElementValue(offerFragment, "cost"));
				offerFragmentBean.setValidity(CFUtils.getElementValue(offerFragment, "validity"));
				if (offerFragment.getElement("allowancesList") != null) {
					String[] allowanceArray = CFUtils.getElementArrayValue(offerFragment, "allowancesList");
					List<CFAllowance> allowanceList = CFUtils.convertStringArrayToList(allowanceArray,
							CFAllowance.class);
					offerFragmentBean.setAllowanceList(allowanceList);
				}
				
			}
		}
		return offerFragmentBean;
	}

}
