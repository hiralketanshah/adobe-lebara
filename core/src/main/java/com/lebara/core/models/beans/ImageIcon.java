package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adapters = {ImageIcon.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageIcon {
	
	@SlingObject
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String name;
    
	@ValueMapValue
	private String imageUrl;

    public String getImage() {
        return image;
    }

    public String getName() {
        return name;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
	public String getImageUrl() {
		return AemUtils.getLinkWithExtension(imageUrl, request);
	}
}
