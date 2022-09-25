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

	@ValueMapValue
	private String heading;

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
	private String portingSectionHeading;

	@ValueMapValue
	private String portInNumberLabel;

	@ValueMapValue
	private String portInNumberPlaceHolder;

	@ValueMapValue
	private String ctaContinueLabel;

	@ValueMapValue
	private String noPortInDescription;

	@ValueMapValue
	private String yesPortInDescription;

	@ChildResource
	protected Resource portInOptions;
	
	@ValueMapValue
	private boolean showDob;
	
	@ValueMapValue
	private boolean showTitle;
	
	@ValueMapValue
	private boolean enableEmailCheckbox;
	
	@ValueMapValue
	private boolean showContinueButton;
	
	@ValueMapValue
	private boolean showAddressCard;
	
	@ValueMapValue
	private boolean showPersonalDetailsLabel;
	
	@ValueMapValue
	private boolean cardMode;
	
	@ValueMapValue
	private boolean titleIsFirst;
	
	@ValueMapValue
	private boolean dayOfBirthByFields;

	public String getHeading() {
		return heading;
	}

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

	public String getPortingSectionHeading() {
		return portingSectionHeading;
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

	public String getNoPortInDescription() {
		return noPortInDescription;
	}

	public String getYesPortInDescription() {
		return yesPortInDescription;
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

	public boolean isShowDob() {
		return showDob;
	}

	public boolean isShowTitle() {
		return showTitle;
	}

	public boolean isEnableEmailCheckbox() {
		return enableEmailCheckbox;
	}

	public boolean isShowContinueButton() {
		return showContinueButton;
	}

	public boolean isShowAddressCard() {
		return showAddressCard;
	}

	public boolean isShowPersonalDetailsLabel() {
		return showPersonalDetailsLabel;
	}

	public boolean isCardMode() {
		return cardMode;
	}

	public boolean isTitleIsFirst() {
		return titleIsFirst;
	}

	public boolean isDayOfBirthByFields() {
		return dayOfBirthByFields;
	}
	
}
