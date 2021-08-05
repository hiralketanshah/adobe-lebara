package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Navigation;

public interface HeaderNavigation extends Navigation {

    public String getLogoPath();
    public String getCtaText();
    public String getCtaLink();
    public String getAccountLink();

}
