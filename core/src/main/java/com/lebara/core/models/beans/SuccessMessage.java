package com.lebara.core.models.beans;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SuccessMessage {

    @ValueMapValue
    private String otpSentSuccessfullyMsg;

    public String getOtpSentSuccessfullyMsg() {
        return otpSentSuccessfullyMsg;
    }

    public void setOtpSentSuccessfullyMsg(String otpSentSuccessfullyMsg) {
        this.otpSentSuccessfullyMsg = otpSentSuccessfullyMsg;
    }

}
