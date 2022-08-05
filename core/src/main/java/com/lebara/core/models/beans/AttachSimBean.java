package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AttachSimBean {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String noSimLable;

    @ValueMapValue
    private String keyMobileSim;

    @ValueMapValue
    private String simAttachInfo;

    @ChildResource
    private AttachSimPopupFormFields frmFields;

    @ChildResource
    private List<ErrorMessageFields> sendSMSOtpErrorMessages;

    @JsonProperty("frmFields")
    public AttachSimPopupFormFields getFrmFields() {
        return frmFields;
    }

    public String getHeading() {
        return heading;
    }

    public String getDescription() {
        return description;
    }

    public String getNoSimLable() {
        return noSimLable;
    }

    public String getKeyMobileSim() {
        return keyMobileSim;
    }

    public Map<String,String> getSendSMSOtpErrorMessages() {
        Map<String,String> map = new HashMap<String,String>();
        if(sendSMSOtpErrorMessages != null && !sendSMSOtpErrorMessages.isEmpty()){
            sendSMSOtpErrorMessages.forEach(item -> map.put(item.getErrorCode(), item.getErrorMessage()));
        }
        return map;
    }

    public String getSimAttachInfo() {
        return simAttachInfo;
    }
}
