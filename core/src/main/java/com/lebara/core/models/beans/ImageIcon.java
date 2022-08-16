package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adapters = {ImageIcon.class}, adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageIcon {

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String name;

    public String getImage() {
        return image;
    }

    public String getName() {
        return name;
    }
    
	public void setImage(String image) {
		this.image = image;
	}
}
