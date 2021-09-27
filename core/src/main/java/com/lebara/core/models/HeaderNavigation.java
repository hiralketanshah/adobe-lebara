package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Navigation;

public interface HeaderNavigation extends Navigation {

    public String getLogoPath();
    public String getTopupCtaText();
    public String getTopupCtaLink();
    public String getAccountLink();
    String getViewAllButtonText();
    String getViewAllButtonLink();
    public String getNewText();

}
