package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Navigation;

public interface HeaderNavigation extends Navigation {

    public String getLogoPath();
    public String getTopupCtaText();
    public String getTopupCtaLink();
    public String getLogolinkurl();
    public String getAccountLink();
    public String getNewText();

}
