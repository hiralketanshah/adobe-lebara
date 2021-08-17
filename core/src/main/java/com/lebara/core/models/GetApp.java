package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Image;
import java.util.List;


public interface GetApp extends Image {

    public String getAppTitle();
    public List<Link> getIcon();


}
