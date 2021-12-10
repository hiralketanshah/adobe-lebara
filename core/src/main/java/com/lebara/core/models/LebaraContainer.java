package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface LebaraContainer extends LayoutContainer {
   
	public String getWidth();
	
}
