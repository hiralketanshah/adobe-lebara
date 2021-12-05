package com.lebara.core.models;

import com.adobe.cq.wcm.core.components.models.Navigation;
import com.lebara.core.models.beans.Link;
import java.util.List;

public interface HeaderNavigation extends Navigation {

    public String getLogoPath();
    public String getTopupCtaText();
    public String getTopupCtaLink();
    public String getLogoLinkURL();
    public String getAccountLink();
    public String getNewText();
    public List<Link> getLinks();
    public String getLogoutLabel();

}
