package com.lebara.core.models.beans;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lebara.core.utils.AemUtils;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PostpaidBuyPersonalDetailsFormFields {

	private static final String VALUE = "value";
	private static final String LABEL = "label";
	private static final String NAME = "name";

	@ValueMapValue
	private String titleLabel;

	@ValueMapValue
	private String titlePlaceholder;

	@ValueMapValue
	private String emailLabel;

	@ValueMapValue
	private String emailPlaceholder;

	@ValueMapValue
	private String fNameLabel;

	@ValueMapValue
	private String fnamePlaceholder;

	@ValueMapValue
	private String lNameLabel;

	@ValueMapValue
	private String lNamePlaceholder;

	@ValueMapValue
	private String dobLabel;

	@ValueMapValue
	private String dayLabel;

	@ValueMapValue
	private String dayPalceholder;

	@ValueMapValue
	private String monthLabel;

	@ValueMapValue
	private String monthPlaceholder;

	@ValueMapValue
	private String yearLabel;

	@ValueMapValue
	private String yearPlaceholder;

	@ValueMapValue
	private String portInNumberLabel;

	@ValueMapValue
	private String portInNumberPlaceHolder;

	@ValueMapValue
	private String ctaContinueLabel;
	
	@ValueMapValue
	private String ctaContinueLink;

	@ValueMapValue
	private String noPortInDescription;

	@ValueMapValue
	private String yesPortInDescription;
	
	@ValueMapValue
	private String portInNumberCanBeUseWithLoginWarnMsg;
	
	@ValueMapValue
	private String prepaidUserMessage;
	
	@ValueMapValue
	private String postpaidUserMessage;
	
	@ValueMapValue
	private String takeNumberToSimOnly;
	
	@ValueMapValue
	private String tooManyTriesMessage;

    @ValueMapValue
    private String companyNameLabel;
    
    @ValueMapValue
    private String companyNamePlaceholder;

    @ValueMapValue
    private String kvkNumberLabel;
    
    @ValueMapValue
    private String kvkNumberPlaceholder;

    @ValueMapValue
    private String vatNumberLabel;
    
    @ValueMapValue
    private String vatNumberPlaceholder;
	
    @ValueMapValue
    private String companyNameNotification;
    
	@ChildResource
	protected Resource portInOptions;
	
	@ChildResource
	protected Resource titleOptions;

	public String getTitleLabel() {
		return titleLabel;
	}

	public String getTitlePlaceholder() {
		return titlePlaceholder;
	}

	public String getEmailLabel() {
		return emailLabel;
	}

	public String getEmailPlaceholder() {
		return emailPlaceholder;
	}

	public String getfNameLabel() {
		return fNameLabel;
	}

	public String getFnamePlaceholder() {
		return fnamePlaceholder;
	}

	public String getlNameLabel() {
		return lNameLabel;
	}

	public String getlNamePlaceholder() {
		return lNamePlaceholder;
	}

	public String getDobLabel() {
		return dobLabel;
	}

	public String getDayLabel() {
		return dayLabel;
	}

	public String getDayPalceholder() {
		return dayPalceholder;
	}

	public String getMonthLabel() {
		return monthLabel;
	}

	public String getMonthPlaceholder() {
		return monthPlaceholder;
	}

	public String getYearLabel() {
		return yearLabel;
	}

	public String getYearPlaceholder() {
		return yearPlaceholder;
	}

	public String getPortInNumberLabel() {
		return portInNumberLabel;
	}

	public String getPortInNumberPlaceHolder() {
		return portInNumberPlaceHolder;
	}

	public String getCtaContinueLabel() {
		return ctaContinueLabel;
	}

	public String getCtaContinueLink() {
		return AemUtils.getLinkWithExtension(ctaContinueLink);
	}

	public String getNoPortInDescription() {
		return noPortInDescription;
	}

	public String getYesPortInDescription() {
		return yesPortInDescription;
	}

	public String getPortInNumberCanBeUseWithLoginWarnMsg() {
		return portInNumberCanBeUseWithLoginWarnMsg;
	}

	public String getPrepaidUserMessage() {
		return prepaidUserMessage;
	}

	public String getPostpaidUserMessage() {
		return postpaidUserMessage;
	}

	public String getTakeNumberToSimOnly() {
		return takeNumberToSimOnly;
	}

	public String getTooManyTriesMessage() {
		return tooManyTriesMessage;
	}

	public String getCompanyNameLabel() {
        return companyNameLabel;
    }

    public String getCompanyNamePlaceholder() {
        return companyNamePlaceholder;
    }

    public String getKvkNumberLabel() {
        return kvkNumberLabel;
    }

    public String getKvkNumberPlaceholder() {
        return kvkNumberPlaceholder;
    }

    public String getVatNumberLabel() {
        return vatNumberLabel;
    }

    public String getVatNumberPlaceholder() {
        return vatNumberPlaceholder;
    }

    public String getCompanyNameNotification() {
        return companyNameNotification;
    }

    @JsonProperty("portInOptions")
	public List<SelectOption> getPortInOptionArray() {
		List<SelectOption> options = new ArrayList<>();
		if (portInOptions != null) {
			for (Resource item : portInOptions.getChildren()) {
				SelectOption option = new SelectOption();
				option.setLabel(AemUtils.getStringProperty(item, LABEL));
				option.setValue(AemUtils.getStringProperty(item, VALUE));
				options.add(option);
			}
		}
		return options;
	}
	
	@JsonProperty("titleOptions")
	public List<SelectTitle> getTitleOptionArray() {
		List<SelectTitle> titles = new ArrayList<>();
		if (titleOptions != null) {
			for (Resource item : titleOptions.getChildren()) {
				SelectTitle title = new SelectTitle();
				title.setName(AemUtils.getStringProperty(item, NAME));
				title.setValue(AemUtils.getStringProperty(item, VALUE));
				titles.add(title);
			}
		}
		return titles;
	}
	
}
