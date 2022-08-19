package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LanguageNavListItem extends ListItem {
    private boolean active;
    private String languageIcon;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getLanguageIcon() {
        return languageIcon;
    }

    public void setLanguageIcon(String languageIcon) {
        this.languageIcon = languageIcon;
    }    
}
