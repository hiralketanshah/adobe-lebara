package com.lebara.core.models.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PersonalDetailsErrorMsg {

	@ValueMapValue
    private String emailRequiredMsg;

    @ValueMapValue
    private String emailInValidMsg;

    public String getEmailRequiredMsg() {
        return emailRequiredMsg;
    }

    public String getEmailInValidMsg() {
        return emailInValidMsg;
    }


}
